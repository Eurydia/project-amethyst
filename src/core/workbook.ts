import dayjs from "dayjs";
import XLSX from "xlsx";

type ExportOptions<
  In extends Object,
  Out extends Object
> = {
  name: string;
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
  const { name, header, transformer } = options;

  const data = (
    await Promise.all(entries.map(transformer))
  ).filter((entry) => entry !== null);

  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: header.map((key) => key.toString()),
  });

  const timestamp = dayjs()
    .locale("th")
    .format("DD MMMM YYYY");

  const workbookName = `${name} (${timestamp}).xlsx`;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, name);

  XLSX.writeFile(workbook, workbookName);
};

type ImportOptions<In extends Object> = {
  validator: (data: unknown) => Promise<In | null>;
  action: (data: In) => Promise<any>;
};
export const importWorkbook = async <T extends Object>(
  file: File,
  options: ImportOptions<T>
) => {
  const { validator, action } = options;

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(sheet);
  const entries = (
    await Promise.all(data.map(validator))
  ).filter((entry) => entry !== null);

  await Promise.all(entries.map(action));
};
