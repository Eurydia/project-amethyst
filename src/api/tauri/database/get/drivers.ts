import { driverModelSchema } from "$types/models/driver";
import { tauri } from "@tauri-apps/api";

export const tauriGetDriverAll = async () => {
  const drivers = await tauri.invoke("get_driver_all");
  const r = driverModelSchema.array().safeParse(drivers);
  if (r.success) {
    return r.data;
  }
  return [];
};

export const tauriGetDriver = async (driverId: number) => {
  const driver = await tauri.invoke("get_driver", {
    driverId,
  });
  const r = driverModelSchema.safeParse(driver);
  if (r.success) {
    return r.data;
  }
  return null;
};
