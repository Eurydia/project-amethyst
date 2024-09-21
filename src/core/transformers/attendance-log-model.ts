import { getDriver } from "$backend/database/get/drivers";
import { getPickupRoute } from "$backend/database/get/pickup-routes";
import { getVehicle } from "$backend/database/get/vehicles";
import {
  AttendanceLogEntry,
  AttendanceLogModel,
} from "$types/models/attendance-log";

export const ATTENDANCE_LOG_MODEL_TRANSFORMER = {
  toAttendanceLogEntry: async (log: AttendanceLogModel) => {
    const driver = await getDriver(log.driver_id);
    const vehicle = await getVehicle(log.vehicle_id);
    const route = await getPickupRoute(log.route_id);
    if (driver === null || vehicle === null || route === null) {
      return null;
    }

    const entry: AttendanceLogEntry = {
      id: log.id,

      expectedArrivalDatetime: log.expected_arrival_datetime,
      expectedDepartureDatetime: log.expected_departure_datetime,

      actualArrivalDatetime: log.actual_arrival_datetime,
      actualDepartureDatetime: log.actual_departure_datetime,

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
