import { vehicleModelSchema } from "$types/models/vehicle";
import { tauri } from "@tauri-apps/api";

export const tauriGetVehicleAll = async () => {
  const vehicles = await tauri.invoke("get_vehicle_all");
  const r = vehicleModelSchema.array().safeParse(vehicles);
  return r.success ? r.data : [];
};

export const tauriGetVehicle = async (
  vehicleId: number
) => {
  const vehicle = tauri.invoke("get_vehicle", {
    vehicleId,
  });
  const r = vehicleModelSchema.safeParse(vehicle);
  return r.success ? r.data : null;
};
