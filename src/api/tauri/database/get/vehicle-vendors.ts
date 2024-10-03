import { tauri } from "@tauri-apps/api";
import { z } from "zod";

export const tauriGetVehicleVendorAll = async () => {
  const vendors = await tauri.invoke(
    "get_vehicle_vendor_all"
  );
  const r = z.string().array().safeParse(vendors);
  return (r.success ? r.data : [])
    .map((vendor) => vendor.trim().normalize())
    .filter((vendor) => vendor.length > 0);
};
