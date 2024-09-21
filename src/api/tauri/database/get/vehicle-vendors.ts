import { tauri } from "@tauri-apps/api";

export const getVehicleVendorAll = async (): Promise<string[]> =>
  tauri.invoke("get_vehicle_vendor_all");
