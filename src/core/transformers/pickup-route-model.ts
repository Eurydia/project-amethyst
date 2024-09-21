import { getDriver } from "$backend/database/get/drivers";
import { getOperationLogToday } from "$backend/database/get/operational-logs";
import { getVehicle } from "$backend/database/get/vehicles";
import {
  PickupRouteEntry,
  PickupRouteExportData,
  PickupRouteModel,
} from "$types/models/pickup-route";

export const PICKUP_ROUTE_MODEL_TRANSFORMER = {
  toPickupRouteEntry: async (route: PickupRouteModel) => {
    const logs = await getOperationLogToday();

    const driverIds = new Set<number>();
    const vehicleIds = new Set<number>();
    for (const log of logs) {
      if (log.route_id !== route.id) {
        continue;
      }
      driverIds.add(log.driver_id);
      vehicleIds.add(log.vehicle_id);
    }

    const drivers = (await Promise.all([...driverIds].map(getDriver)))
      .filter((driver) => driver !== null)
      .map(({ id, name, surname }) => ({
        id,
        name,
        surname,
      }));
    const vehicles = (await Promise.all([...vehicleIds].map(getVehicle)))
      .filter((vehicle) => vehicle !== null)
      .map(({ id, license_plate }) => ({
        id,
        licensePlate: license_plate,
      }));

    const entry: PickupRouteEntry = {
      id: route.id,
      name: route.name,
      drivers,
      vehicles,
    };
    return entry;
  },

  toPickupRouteExportData: (route: PickupRouteModel) => {
    const data: PickupRouteExportData = {
      ชื่อสาย: route.name,
      เลขรหัส: route.id,
      เวลารับเข้า: route.arrival_time,
      เวลารับออก: route.departure_time,
    };
    return data;
  },
};
