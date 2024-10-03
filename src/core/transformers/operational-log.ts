import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  OperationalLogEntry,
  OperationalLogModel,
} from "$types/models/operational-log";

export const OPERATIONAL_LOG_MODEL_TRANSFORMER = {
  toEntry: async (log: OperationalLogModel) => {
    const vehicle = await tauriGetVehicle(log.vehicle_id);
    const driver = await tauriGetDriver(log.driver_id);
    const route = await tauriGetPickupRoute(log.route_id);

    if (
      vehicle === null ||
      driver === null ||
      route === null
    ) {
      return null;
    }

    const entry: OperationalLogEntry = {
      id: log.id,
      start_date: log.start_date,
      end_date: log.end_date,

      vehicle_id: vehicle.id,
      vehicle_license_plate: vehicle.license_plate,

      driver_id: driver.id,
      driver_name: driver.name,
      driver_surname: driver.surname,

      route_id: route.id,
      route_name: route.name,
    };
    return entry;
  },
};
