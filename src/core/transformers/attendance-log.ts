import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  AttendanceLogEntry,
  AttendanceLogExportData,
  AttendanceLogModel,
} from "$types/models/attendance-log";
import dayjs from "dayjs";

const formatTime = (datetime: string) => {
  return dayjs(datetime).locale("th").format("HH:mm น.");
};

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

      expected_arrival_datetime:
        log.expected_arrival_datetime,
      expected_departure_datetime:
        log.expected_departure_datetime,

      actual_arrival_datetime: log.actual_arrival_datetime,
      actual_departure_datetime:
        log.actual_departure_datetime,

      driver_id: log.driver_id,
      driver_name: driver.name,
      driver_surname: driver.surname,

      vehicle_id: log.vehicle_id,
      vehicle_license_plate: vehicle.license_plate,

      route_id: log.route_id,
      route_name: route.name,
    };

    return entry;
  },

  toExportData: async (log: AttendanceLogModel) => {
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

    let arrivalStatus = "ยังไม่ได้รับเข้า";
    if (log.actual_arrival_datetime !== null) {
      arrivalStatus = "รับเข้าแล้ว";
      const expected = dayjs(log.expected_arrival_datetime);
      const actual = dayjs(log.actual_arrival_datetime);
      if (actual.isAfter(expected)) {
        arrivalStatus = "สาย";
      }
    }

    let departureStatus = "ยังไม่ได้รับออก";
    if (log.actual_departure_datetime !== null) {
      departureStatus = "รับออกแล้ว";
      const expected = dayjs(
        log.expected_departure_datetime
      );
      const actual = dayjs(log.actual_departure_datetime);
      if (actual.isAfter(expected)) {
        departureStatus = "สาย";
      }
    }

    const entry: AttendanceLogExportData = {
      รหัส: log.id,

      รหัสคนขับรถ: log.driver_id,
      รหัสรถรับส่ง: log.vehicle_id,
      รหัสสายรถ: log.route_id,

      ชื่อคนขับรถ: driver.name,
      นามสกุลคนขับรถ: driver.surname,
      เลขทะเบียนรถ: vehicle.license_plate,
      ชื่อสายรถ: route.name,

      วันที่: dayjs(log.expected_arrival_datetime)
        .locale("th")
        .format("DD/MMMM/YYYY"),

      เวลารับเข้าตามกำหนด: formatTime(
        log.expected_arrival_datetime
      ),
      เวลารับออกตามกำหนด: formatTime(
        log.expected_departure_datetime
      ),
      เวลารับเข้าจริง:
        log.actual_arrival_datetime !== null
          ? formatTime(log.actual_arrival_datetime)
          : "-",
      เวลารับออกจริง:
        log.actual_departure_datetime !== null
          ? formatTime(log.actual_departure_datetime)
          : "-",
      สถานะรับเข้า: arrivalStatus,
      รับออกสาย: departureStatus,
    };

    return entry;
  },
};
