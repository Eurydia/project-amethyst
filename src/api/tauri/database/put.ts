import { DriverFormData } from "$types/models/driver";
import { DriverReportFormData } from "$types/models/driver-report";
import { PickupRouteFormData } from "$types/models/pickup-route";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import { VehicleFormData } from "$types/models/vehicle";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import { VehicleReportInspectionFormData } from "$types/models/vehicle-report-inspection";
import { invoke } from "@tauri-apps/api/tauri";

//#region Attendance log
export const putAttendanceLog = async ({
  id,
  actualArrivalDatetime,
  actualDepartureDatetime,
}: {
  id: number;
  actualArrivalDatetime: string | null;
  actualDepartureDatetime: string | null;
}) => {
  invoke("put_attendance_log", {
    id,
    actualArrivalDatetime,
    actualDepartureDatetime,
  });
};
//#endregion

//#region Driver
export const putDriver = async (
  id: number,
  driver: DriverFormData,
) =>
  invoke("put_driver", {
    id,
    ...driver,
  });
export const putDriverReportGeneral = async (
  id: number,
  report: DriverReportFormData,
) =>
  invoke("put_driver_report_general", {
    id,
    ...report,
  });
export const putDriverReportMedical = async (
  id: number,
  report: DriverReportFormData,
) =>
  invoke("put_driver_report_medical", {
    id,
    ...report,
  });
//#endregion

//#region Pickup Route
export const putPickupRoute = async (
  id: number,
  route: PickupRouteFormData,
) =>
  invoke("put_pickup_route", {
    id,
    ...route,
  });
export const putPickupRouteReportGeneral = async (
  id: number,
  report: PickupRouteReportGeneralFormData,
) =>
  invoke("put_pickup_route_report_general", {
    id,
    ...report,
  });
//#endregion

//#region Vehicle
export const putVehicle = async (
  id: number,
  vehicle: VehicleFormData,
) =>
  invoke("put_vehicle", {
    id,
    ...vehicle,
  });
export const putVehicleReportGeneral = async (
  id: number,
  report: VehicleReportGeneralFormData,
) =>
  invoke("put_vehicle_report_general", {
    id,
    ...report,
  });
export const putVehicleReportInspection = async (
  id: number,
  report: VehicleReportInspectionFormData,
) =>
  invoke("put_vehicle_report_inspection", {
    id,
    ...report,
  });
//#endregion
