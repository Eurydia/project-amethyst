/** @format */

import { VehicleModel } from "$types/models/vehicle";
import { tauri } from "@tauri-apps/api";

export const tauriGetVehicleAll = async (): Promise<VehicleModel[]> =>
	tauri.invoke("get_vehicle_all");

export const tauriGetVehicle = async (
	vehicleId: number
): Promise<VehicleModel | null> => tauri.invoke("get_vehicle", { vehicleId });
