import { tauriGetOperationalLogToday } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  DriverEntry,
  DriverExportData,
  DriverFormData,
  DriverModel,
} from "$types/models/driver";

export const DRIVER_MODEL_TRANSFORMER = {
  toEntry: async (driver: DriverModel) => {
    const logs = (
      await tauriGetOperationalLogToday()
    ).filter(({ driver_id }) => driver_id === driver.id);
    const routeIds = new Set<number>();
    const vehicleIds = new Set<number>();
    for (const log of logs) {
      routeIds.add(log.route_id);
      vehicleIds.add(log.vehicle_id);
    }
    const vehicles = (
      await Promise.all(
        [...vehicleIds].map(tauriGetVehicle)
      )
    )
      .filter((vehicle) => vehicle !== null)
      .map(({ id, license_plate }) => ({
        id,
        licensePlate: license_plate,
      }));

    const routes = (
      await Promise.all(
        [...routeIds].map(tauriGetPickupRoute)
      )
    )
      .filter((route) => route !== null)
      .map(({ id, name }) => ({
        id,
        name,
      }));

    const entry: DriverEntry = {
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      routes,
      vehicles,
    };
    return entry;
  },

  toFormData: (
    driver: DriverModel | undefined
  ): DriverFormData => {
    if (driver !== undefined) {
      return driver;
    }
    let formData: DriverFormData = {
      name: "",
      surname: "",
      contact: "",
      license_type: "ท.1",
    };

    return formData;
  },

  toExportData: async (driver: DriverModel) => {
    const exportData: DriverExportData = {
      รหัส: driver.id,
      ชื่อ: driver.name,
      นามสกุล: driver.surname,
      เบอร์ติดต่อ: driver.contact,
      ประเภทใบขับขี่: driver.license_type,
    };
    return exportData;
  },
};
