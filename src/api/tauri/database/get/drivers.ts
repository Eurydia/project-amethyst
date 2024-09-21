import { DriverModel } from "$types/models/driver";
import { tauri } from "@tauri-apps/api";

export const getDriverAll = async (): Promise<DriverModel[]> =>
  tauri.invoke("get_driver_all");

export const getDriver = async (
  driverId: number
): Promise<DriverModel | null> =>
  tauri.invoke("get_driver", {
    driverId,
  });
