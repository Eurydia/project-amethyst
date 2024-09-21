import { AttendanceLogFormData } from "$types/models/attendance-log";
import { DriverFormData } from "$types/models/driver";
import { DriverReportFormData } from "$types/models/driver-report";
import { OperationalLogFormData } from "$types/models/operational-log";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { VehicleFormData } from "$types/models/vehicle";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import { VehicleReportInspectionFormData } from "$types/models/vehicle-report-inspection";
import { tauri } from "@tauri-apps/api";

//#region Operational Log
export const postAttendanceLog = async (log: AttendanceLogFormData) =>
  tauri.invoke("post_attendance_log", log);
//#endregion

//#region Operational Log
export const postOperationalLog = async (log: OperationalLogFormData) =>
  tauri.invoke("post_operational_log", log);
//#endregion

//#region Driver
export const postDriver = async (driver: DriverFormData): Promise<number> =>
  tauri.invoke("post_driver", driver);

export const postDriverReportGeneral = async (
  report: DriverReportFormData
): Promise<number> => tauri.invoke("post_driver_report_general", report);

export const postDriverReportMedical = async (
  report: DriverReportFormData
): Promise<number> => tauri.invoke("post_driver_report_medical", report);
//#endregion

//#region Pickup Route
export const postPickupRoute = async (
  route: PickupRouteFormData
): Promise<number> => tauri.invoke("post_pickup_route", route);

export const postPickupRouteReportGeneral = async (
  report: PickupRouteReportGeneralFormData
): Promise<number> => tauri.invoke("post_pickup_route_report_general", report);
//#endregion

//#region Vehicle
export const postVehicle = async (vehicle: VehicleFormData): Promise<number> =>
  tauri.invoke("post_vehicle", vehicle);

export const postVehicleReportGeneral = async (
  report: VehicleReportGeneralFormData
): Promise<number> => tauri.invoke("post_vehicle_report_general", report);
export const postVehicleReportInspection = async (
  report: VehicleReportInspectionFormData
): Promise<number> => tauri.invoke("post_vehicle_report_inspection", report);
//#endregion
