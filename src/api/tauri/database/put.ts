import { AttendanceLogModel } from "$types/models/attendance-log";
import { DriverFormData } from "$types/models/driver";
import { DriverReportFormData } from "$types/models/driver-report";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { VehicleFormData } from "$types/models/vehicle";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import { VehicleReportInspectionFormData } from "$types/models/vehicle-report-inspection";
import { invoke } from "@tauri-apps/api/tauri";

//#region Attendance log
export const tauriPutAttendanceLog = async (
  log: Pick<
    AttendanceLogModel,
    | "id"
    | "actual_arrival_datetime"
    | "actual_departure_datetime"
  >
) => {
  invoke("put_attendance_log", log);
};
//#endregion

//#region Driver
export const tauriPutDriver = async (
  id: number,
  driver: DriverFormData
) =>
  invoke("put_driver", {
    id,
    ...driver,
  });
export const tauriPutDriverReportGeneral = async (
  id: number,
  report: DriverReportFormData
) =>
  invoke("put_driver_report_general", {
    id,
    ...report,
  });
export const tauriPutDriverReportMedical = async (
  id: number,
  report: DriverReportFormData
) =>
  invoke("put_driver_report_medical", {
    id,
    ...report,
  });
//#endregion

//#region Pickup Route
export const tauriPutPickupRoute = async (
  id: number,
  route: PickupRouteFormData
) =>
  invoke("put_pickup_route", {
    id,
    ...route,
  });
export const tauriPutPickupRouteReportGeneral = async (
  id: number,
  report: PickupRouteReportGeneralFormData
) =>
  invoke("put_pickup_route_report_general", {
    id,
    ...report,
  });
//#endregion

//#region Vehicle
export const tauriPutVehicle = async (
  id: number,
  vehicle: VehicleFormData
) =>
  invoke("put_vehicle", {
    id,
    ...vehicle,
  });
export const tauriPutVehicleReportGeneral = async (
  id: number,
  report: VehicleReportGeneralFormData
) =>
  invoke("put_vehicle_report_general", {
    id,
    ...report,
  });
export const tauriPutVehicleReportInspection = async (
  id: number,
  report: VehicleReportInspectionFormData
) =>
  invoke("put_vehicle_report_inspection", {
    id,
    ...report,
  });
//#endregion
