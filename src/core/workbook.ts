import XLSX from "xlsx";

type ExportOptions<Entry extends Object, ExportData extends Object> = {
  workbookName: string;
  worksheetName: string;
  header: (keyof ExportData)[];
  transformer: (data: Entry) => Promise<ExportData | null>;
};
export const exportWorkbook = async <T extends Object, K extends Object>(
  entries: T[],
  options: ExportOptions<T, K>
) => {
  const { workbookName, worksheetName, header, transformer } = options;

  const transformedEntries = await Promise.all(entries.map(transformer));
  const exportData = transformedEntries.filter((entry) => entry !== null);

  const worksheet = XLSX.utils.json_to_sheet(exportData, {
    header: header.map((key) => key.toString()),
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(workbook, workbookName + ".xlsx");
};

type ImportOptions<T extends Object> = {
  transformer: (data: unknown) => Promise<T | null>;
  action: (data: T) => Promise<void>;
};
export const importWorkbook = async <T extends Object>(
  file: File,
  options: ImportOptions<T>
) => {
  const { transformer, action } = options;

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data = XLSX.utils.sheet_to_json(sheet);
  const entries = (await Promise.all(data.map(transformer))).filter(
    (entry) => entry !== null
  );

  await Promise.all(entries.map(action));
};
