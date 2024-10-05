import dayjs from "dayjs";
import XLSX from "xlsx";

type ExportOptions<
  In extends Object,
  Out extends Object
> = {
  name: string;
  transformer: (data: In) => Promise<Out | null>;
};
export const exportWorkbook = async <
  In extends Object,
  Out extends Object
>(
  entries: In[],
  options: ExportOptions<In, Out>
) => {
  const { name, transformer } = options;

  const data = (
    await Promise.all(entries.map(transformer))
  ).filter((entry) => entry !== null);

  const worksheet = XLSX.utils.json_to_sheet(data);

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
export const importWorkbook = async <In extends Object>(
  file: File,
  options: ImportOptions<In>
) => {
  const { validator, action } = options;

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils
    .sheet_to_json(sheet)
    .map(validator);
  const items = (await Promise.all(data))
    .filter((entry) => entry !== null)
    .map(action);

  await Promise.any(items);
};
