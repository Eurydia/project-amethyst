import { tauriPostVehicle } from "$backend/database/post";
import { tauriPutVehicle } from "$backend/database/put";
import {
  VehicleFormData,
  VehicleModel,
} from "$types/models/vehicle";
import { useCallback } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";

export const useVehicleFormActions = () => {
  const { revalidate } = useRevalidator();

  const _put = useCallback(
    (
      vehicle: VehicleModel,
      formData: VehicleFormData,
      onFinally: () => void
    ) =>
      tauriPutVehicle(vehicle.id, formData)
        .then(
          // TODO: translate
          () => toast.success("Vehicle updated"),
          () => toast.error("Failed to update vehicle")
        )
        .then(revalidate)
        .finally(onFinally),
    []
  );
  const _post = useCallback(
    (formData: VehicleFormData, onFinally: () => void) =>
      tauriPostVehicle(formData)
        // TODO: translate
        .then(
          () => toast.success("Vehicle updated"),
          () => toast.error("Failed to update vehicle")
        )
        .then(revalidate)
        .finally(onFinally),
    []
  );
  return [_put, _post] as const;
};
