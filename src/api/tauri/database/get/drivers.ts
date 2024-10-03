import {
  DriverModel,
  driverModelSchema,
} from "$types/models/driver";
import { tauri } from "@tauri-apps/api";

const _prepare = (driver: DriverModel) => {
  const _r: DriverModel = {
    id: driver.id,
    license_type: driver.license_type,
    contact: driver.contact.trim().normalize(),
    name: driver.name.trim().normalize(),
    surname: driver.surname.trim().normalize(),
  };
  return _r;
};
export const tauriGetDriverAll = async () => {
  const drivers = await tauri.invoke("get_driver_all");
  const r = driverModelSchema.array().safeParse(drivers);
  return (r.success ? r.data : []).map(_prepare);
};

export const tauriGetDriver = async (driverId: number) => {
  const driver = await tauri.invoke("get_driver", {
    driverId,
  });
  const r = driverModelSchema.safeParse(driver);

  return r.success ? _prepare(r.data) : null;
};
