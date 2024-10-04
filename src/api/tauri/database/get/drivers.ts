import { driverModelSchema } from "$types/models/driver";
import { tauri } from "@tauri-apps/api";

export const tauriGetDriverAll = async () => {
  const drivers = await tauri.invoke("get_driver_all");
  const r = driverModelSchema.array().safeParse(drivers);
  return r.success ? r.data : [];
};

export const tauriGetDriver = async (driverId: number) => {
  const driver = await tauri.invoke("get_driver", {
    driverId,
  });
  const r = driverModelSchema.safeParse(driver);

  return r.success ? r.data : null;
};
