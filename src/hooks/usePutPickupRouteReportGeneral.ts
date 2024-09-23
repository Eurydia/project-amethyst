/** @format */

import { tauriPutPickupRouteReportGeneral } from "$backend/database/put";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { useCallback } from "react";
import { toast } from "react-toastify";

type Options = {
  successMessage?: string;
  errorMessage?: string;
};

export const usePutPickupRouteReportGeneral = (options?: Options) => {
  let successMessage = "Update general report details"; // TODO: translate
  if (options !== undefined && options.successMessage !== undefined) {
    successMessage = options.successMessage;
  }
  let errorMessage = "Update failed"; // TODO: translate
  if (options !== undefined && options.errorMessage !== undefined) {
    errorMessage = options.errorMessage;
  }

  const putRouteReportGeneral = useCallback(
    (reportId: number, formData: PickupRouteReportGeneralFormData) =>
      tauriPutPickupRouteReportGeneral(reportId, formData).then(
        () => toast.success(successMessage),
        () => toast.error(errorMessage)
      ),
    [errorMessage, successMessage]
  );
  return putRouteReportGeneral;
};
