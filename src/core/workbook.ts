import dayjs from "dayjs";
import XLSX from "xlsx";

type ExportOptions<
  In extends Object,
  Out extends Object
> = {
  workbookName: string;
  worksheetName: string;
  header: (keyof Out)[];
  transformer: (data: In) => Promise<Out | null>;
};
export const exportWorkbook = async <
  In extends Object,
  Out extends Object
>(
  entries: In[],
  options: ExportOptions<In, Out>
) => {
  const {
    workbookName,
    worksheetName,
    header,
    transformer,
  } = options;

  const data = (
    await Promise.all(entries.map(transformer))
  ).filter((entry) => entry !== null);

  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: header.map((key) => key.toString()),
  });

  const timestamp = dayjs()
    .locale("th")
    .format("DD MMMM YYYY");

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    worksheetName
  );

  XLSX.writeFile(
    workbook,
    `${workbookName} (${timestamp}).xlsx`
  );
};

type ImportOptions<In extends Object> = {
  transformer: (data: unknown) => Promise<In | null>;
  action: (data: In) => Promise<any>;
  cleanup: (() => Promise<any>) | (() => void);
};
export const importWorkbook = async <T extends Object>(
  file: File,
  options: ImportOptions<T>
) => {
  const { cleanup, transformer, action } = options;

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(sheet);
  const entries = (
    await Promise.all(data.map(transformer))
  ).filter((entry) => entry !== null);

  await Promise.all(entries.map(action)).finally(cleanup);
};
