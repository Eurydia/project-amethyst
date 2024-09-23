/** @format */

import { tauriGetPickupRouteReportGeneral } from "$backend/database/get/pickup-routes-general-reports";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general-model";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
import { useCallback } from "react";
import { toast } from "react-toastify";
import XLSX from "xlsx";

type Options = {
  workbookName?: string;
  worksheetName?: string;
  successMessage?: string;
};
export const useExportPickupRouteReportGeneral = (options?: Options) => {
  let successMsg = "Success"; // TODO: translate
  if (options !== undefined && options.successMessage !== undefined) {
    successMsg = options.successMessage;
  }
  let workbookName = "pickup routes"; // TODO: translate
  if (options !== undefined && options.workbookName !== undefined) {
    workbookName = options.workbookName;
  }
  let worksheetName = "routes"; // TODO: translate
  if (options !== undefined && options.worksheetName !== undefined) {
    worksheetName = options.worksheetName;
  }

  const exportFn = useCallback(
    async (reportEntries: PickupRouteReportGeneralEntry[]) => {
      const reports = await Promise.all(
        reportEntries
          .map((entry) => entry.id)
          .map((routeId) => tauriGetPickupRouteReportGeneral(routeId))
      );
      const data = reports
        .filter((route) => route !== null)
        .toSorted((a, b) => a.id - b.id)
        .map(
          PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toPickupRouteReportExportData
        );

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
      XLSX.writeFile(workbook, workbookName + ".xlsx");
      toast.success(successMsg);
    },
    [workbookName, worksheetName, successMsg]
  );

  return exportFn;
};
