/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriPostPickupRouteReportGeneral } from "$backend/database/post";
import {
  PickupRouteReportGeneralExportData,
  PickupRouteReportGeneralFormData,
} from "$types/models/pickup-route-report-general";
import { useCallback } from "react";
import { toast } from "react-toastify";
import XLSX from "xlsx";

type Options = {
  successMessage?: string;
  errorMessage?: string;
};
export const useImportPickupRouteReportGeneral = (options?: Options) => {
  let successMsg = "Added routes"; // TODO: translate
  if (options !== undefined && options.successMessage !== undefined) {
    successMsg = options.successMessage;
  }
  let errorMsg = "Registration failed"; // TODO: translate
  if (options !== undefined && options.errorMessage !== undefined) {
    errorMsg = options.errorMessage;
  }

  const importFn = useCallback(
    async (file: File): Promise<void> => {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const entries =
        XLSX.utils.sheet_to_json<PickupRouteReportGeneralExportData>(sheet);

      const postReqs = entries.map(async (entry) => {
        const route = await tauriGetPickupRoute(entry.รหัสสายรถ);
        if (route === null) {
          return null;
        }
        const formData: PickupRouteReportGeneralFormData = {
          route,
          datetime: entry["วันที่ลงบันทึก"],
          title: entry["เรื่อง"],
          content: entry["รายละเอียด"],
          topics: entry["หัวข้อที่เกี่ยวข้อง"].split(","),
        };
        await tauriPostPickupRouteReportGeneral(formData);
      });

      await Promise.allSettled(postReqs).then(
        () => toast.success(successMsg),
        () => toast.error(errorMsg)
      );
    },
    [successMsg, errorMsg]
  );
  return importFn;
};
