import {
  VehicleModel,
  vehicleModelSchema,
} from "$types/models/vehicle";
import { tauri } from "@tauri-apps/api";

const _prepare = (vehicle: VehicleModel) => {
  const _r: VehicleModel = {
    id: vehicle.id,
    license_plate: vehicle.license_plate.trim().normalize(),
    vendor: vehicle.vendor.trim().normalize(),
    registered_city: vehicle.registered_city,
    vehicle_class: vehicle.vehicle_class,
  };
  return _r;
};
export const tauriGetVehicleAll = async () => {
  const vehicles = await tauri.invoke("get_vehicle_all");
  const r = vehicleModelSchema.array().safeParse(vehicles);
  return (r.success ? r.data : []).map(_prepare);
};

export const tauriGetVehicle = async (
  vehicleId: number
) => {
  const vehicle = tauri.invoke("get_vehicle", {
    vehicleId,
  });
  const r = vehicleModelSchema.safeParse(vehicle);
  return r.success ? _prepare(r.data) : null;
};
