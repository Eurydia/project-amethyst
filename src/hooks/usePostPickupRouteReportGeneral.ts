/** @format */

import { tauriPostPickupRouteReportGeneral } from "$backend/database/post";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { useCallback } from "react";
import { toast } from "react-toastify";

type Options = {
  toastSuccessMessage?: string;
  toastErrorMessage?: string;
};
export const usePostPickupRouteReportGeneral = (options?: Options) => {
  let successMsg = "Added new general route report"; // TODO: translate;
  if (options !== undefined && options.toastSuccessMessage !== undefined) {
    successMsg = options.toastSuccessMessage;
  }

  let errorMsg = "Failed to add new general route report"; // TODO: translate;
  if (options !== undefined && options.toastErrorMessage !== undefined) {
    errorMsg = options.toastErrorMessage;
  }

  const postRouteReportGeneral = useCallback(
    (formData: PickupRouteReportGeneralFormData) =>
      tauriPostPickupRouteReportGeneral(formData).then(
        (routeId) => {
          toast.success(successMsg);
          return routeId;
        },
        () => {
          toast.error(errorMsg);
          return null;
        }
      ),
    []
  );
  return postRouteReportGeneral;
};
