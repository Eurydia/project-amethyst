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
export const tauriPostAttendanceLog = async (
  log: AttendanceLogFormData
) => tauri.invoke("post_attendance_log", log);
//#endregion

//#region Operational Log
export const tauriPostOperationalLog = async (
  log: OperationalLogFormData
) => tauri.invoke("post_operational_log", log);
//#endregion

//#region Driver
export const tauriPostDriver = async (
  driver: DriverFormData
): Promise<number> => tauri.invoke("post_driver", driver);

export const tauriPostDriverReportGeneral = async (
  report: DriverReportFormData
): Promise<number> =>
  tauri.invoke("post_driver_report_general", report);

export const tauriPostDriverReportMedical = async (
  report: DriverReportFormData
): Promise<number> =>
  tauri.invoke("post_driver_report_medical", report);
//#endregion

//#region Pickup Route
export const tauriPostPickupRoute = async (
  route: PickupRouteFormData
): Promise<number> =>
  tauri.invoke("post_pickup_route", route);

export const tauriPostPickupRouteReportGeneral = async (
  report: PickupRouteReportGeneralFormData
): Promise<number> =>
  tauri.invoke("post_pickup_route_report_general", report);
//#endregion

//#region Vehicle
export const tauriPostVehicle = async (
  vehicle: VehicleFormData
): Promise<number> => tauri.invoke("post_vehicle", vehicle);

export const tauriPostVehicleReportGeneral = async (
  report: VehicleReportGeneralFormData
): Promise<number> =>
  tauri.invoke("post_vehicle_report_general", report);
export const tauriPostVehicleReportInspection = async (
  report: VehicleReportInspectionFormData
): Promise<number> =>
  tauri.invoke("post_vehicle_report_inspection", report);
//#endregion
