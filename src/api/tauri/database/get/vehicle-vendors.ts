/** @format */

import { tauri } from "@tauri-apps/api";

export const tauriGetVehicleVendorAll = async (): Promise<string[]> =>
	tauri.invoke("get_vehicle_vendor_all");
