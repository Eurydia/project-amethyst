/** @format */

import { tauriPutPickupRoute } from "$backend/database/put";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { useCallback } from "react";
import { toast } from "react-toastify";

type Options = {
  successMessage?: string;
  errorMessage?: string;
};

export const usePutPickupRoute = (options?: Options) => {
  let successMessage = "Update route success"; // TODO: translate
  if (options !== undefined && options.successMessage !== undefined) {
    successMessage = options.successMessage;
  }
  let errorMessage = "Update route failed"; // TODO: translate
  if (options !== undefined && options.errorMessage !== undefined) {
    errorMessage = options.errorMessage;
  }

  const putRoute = useCallback(
    (routeId: number, formData: PickupRouteFormData) =>
      tauriPutPickupRoute(routeId, formData).then(
        () => toast.success(successMessage),
        () => toast.error(errorMessage)
      ),
    [errorMessage, successMessage]
  );
  return putRoute;
};
