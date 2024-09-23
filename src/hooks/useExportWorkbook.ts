/** @format */

import { toast } from "react-toastify";
import XLSX from "xlsx";

type Options<Entry extends Object, ExportData extends Object> = {
  workbookName: string;
  worksheetName: string;
  successMessage: string;
  header: (keyof ExportData)[];
  transformer: (data: Entry) => Promise<ExportData | null>;
};
export const useExportWorkbook = <
  Entry extends Object,
  ExportData extends Object
>(
  options: Options<Entry, ExportData>
) => {
  const { workbookName, worksheetName, successMessage, header, transformer } =
    options;

  const exportFn = async (entries: Entry[]) => {
    const transformedEntries = await Promise.all(entries.map(transformer));
    const exportData = transformedEntries.filter((entry) => entry !== null);

    const worksheet = XLSX.utils.json_to_sheet(exportData, {
      header: header.map((key) => key.toString()),
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
    XLSX.writeFile(workbook, workbookName + ".xlsx");
    toast.success(successMessage);
  };
  return exportFn;
};
