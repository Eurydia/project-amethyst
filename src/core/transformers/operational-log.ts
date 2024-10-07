import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { DriverModel } from "$types/models/driver";
import {
  OperationalLogEntry,
  OperationalLogExportData,
  OperationalLogFormData,
  OperationalLogModel,
} from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import dayjs from "dayjs";

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
  toFormData: (
    driver: DriverModel,
    vehicle: VehicleModel,
    route: PickupRouteModel
  ) => {
    const formData: OperationalLogFormData = {
      start_date: dayjs().startOf("month").format(),
      end_date: dayjs().endOf("month").format(),
      driver,
      route,
      vehicle,
    };
    return formData;
  },
  toExportData: async (log: OperationalLogModel) => {
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

    const exportData: OperationalLogExportData = {
      วันที่หมดอายุ: dayjs(log.end_date)
        .locale("th")
        .format("DD MMMM YYYY"),
      วันที่เริ่มมีผล: dayjs(log.start_date)
        .locale("th")
        .format("DD MMMM YYYY"),
      รหัส: log.id,
      รหัสคนขับรถ: driver.id,
      รหัสรถรับส่ง: vehicle.id,
      รหัสสายรถ: route.id,

      เลขทะเบียน: vehicle.license_plate,
      ชื่อสาย: route.name,
      ชื่อคนขับรถ: driver.name,
      นามสกุลคนขับรถ: driver.surname,
    };
    return exportData;
  },
};
