import { tauriGetAttendanceLogToday } from "$backend/database/get/attendance-logs";
import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetOperationalLogToday } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { tauriPostAttendanceLog } from "$backend/database/post";
import { AttendanceLogFormData } from "$types/models/attendance-log";
import dayjs from "dayjs";
import { useCallback } from "react";

export const useSyncLogAction = () => {
  const fn = useCallback(async () => {
    const opLogs = await tauriGetOperationalLogToday();
    const attLogs = await tauriGetAttendanceLogToday();
    const attLogSet = new Set(
      attLogs.map((log) => log.operational_log_id)
    );
    const today = dayjs().startOf("day");

    const formData: Promise<AttendanceLogFormData | null>[] =
      opLogs.map(async (log) => {
        if (attLogSet.has(log.id)) {
          return null;
        }
        const route = await tauriGetPickupRoute(
          log.route_id
        );
        const driver = await tauriGetDriver(log.driver_id);
        const vehicle = await tauriGetVehicle(
          log.vehicle_id
        );
        if (
          vehicle === null ||
          driver === null ||
          route === null
        ) {
          return null;
        }
        const expectedArrivalTime = dayjs(
          route.arrival_time,
          "HH:mm"
        );
        const expectedDepartureTime = dayjs(
          route.departure_time,
          "HH:mm"
        );
        const expectedArrivalDatetime = today
          .set("hour", expectedArrivalTime.hour())
          .set("minute", expectedArrivalTime.minute())
          .format();
        const expectedDepartureDatetime = today
          .set("hour", expectedDepartureTime.hour())
          .set("minute", expectedDepartureTime.minute())
          .format();

        const formData: AttendanceLogFormData = {
          actual_arrival_datetime: null,
          actual_departure_datetime: null,
          expected_arrival_datetime:
            expectedArrivalDatetime,
          expected_departure_datetime:
            expectedDepartureDatetime,
          operational_log: log,
          route,
          vehicle,
          driver,
        };
        return formData;
      });
    const requests = (await Promise.all(formData))
      .filter((v) => v !== null)
      .map(tauriPostAttendanceLog);
    await Promise.all(requests);
  }, []);
  return fn;
};
