import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  AttendanceLogEntry,
  AttendanceLogModel,
} from "$types/models/attendance-log";

export const ATTENDANCE_LOG_MODEL_TRANSFORMER = {
  toEntry: async (log: AttendanceLogModel) => {
    const driver = await tauriGetDriver(log.driver_id);
    const vehicle = await tauriGetVehicle(log.vehicle_id);
    const route = await tauriGetPickupRoute(log.route_id);
    if (
      driver === null ||
      vehicle === null ||
      route === null
    ) {
      return null;
    }
    const entry: AttendanceLogEntry = {
      id: log.id,

      expectedArrivalDatetime:
        log.expected_arrival_datetime,
      expectedDepartureDatetime:
        log.expected_departure_datetime,

      actualArrivalDatetime: log.actual_arrival_datetime,
      actualDepartureDatetime:
        log.actual_departure_datetime,

      driverId: log.driver_id,
      driverName: driver.name,
      driverSurname: driver.surname,

      vehicleId: log.vehicle_id,
      vehicleLicensePlate: vehicle.license_plate,

      routeId: log.route_id,
      routeName: route.name,
    };

    return entry;
  },
};
