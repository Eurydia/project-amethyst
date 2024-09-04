import { AttendanceLogModel } from "$types/models/AttendanceLog";
import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import {
	VehicleModel,
	VehicleReportGeneralModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { invoke } from "@tauri-apps/api/tauri";

//#region Attendance log
export const postAttendanceLog = async (
	log: Omit<AttendanceLogModel, "id">,
) => invoke("post_attendance_log", { log });
//#endregion

//#region Operational Log
export const postOperationalLog = async (
	log: Omit<OperationalLogModel, "id">,
) => invoke("post_operational_log", { log });
//#endregion

//#region Driver
export const postDriver = async (
	driver: Omit<DriverModel, "id">,
) => invoke("post_driver", { driver });
export const postDriverReportGeneral = async (
	report: Omit<DriverReportModel, "id">,
) =>
	invoke("post_driver_report_general", {
		report,
	});
export const postDriverReportMedical = async (
	report: Omit<DriverReportModel, "id">,
) =>
	invoke("post_driver_report_medical", {
		report,
	});
//#endregion

//#region Pickup Route
export const postPickupRoute = async (
	route: Omit<PickupRouteModel, "id">,
) => invoke("post_pickup_route", { route });
export const postPickupRouteReportGeneral =
	async (
		report: Omit<PickupRouteReportModel, "id">,
	) =>
		invoke("post_pickup_route_report_general", {
			report,
		});
//#endregion

//#region Vehicle
export const postVehicle = async (
	vehicle: Omit<VehicleModel, "id">,
) => invoke("post_vehicle", { vehicle });
export const postVehicleReportGeneral = async (
	report: Omit<VehicleReportGeneralModel, "id">,
) =>
	invoke("post_vehicle_report_general", {
		report,
	});
export const postVehicleReportInspection = async (
	report: Omit<
		VehicleReportInspectionModel,
		"id"
	>,
) =>
	invoke("post_vehicle_report_inspection", {
		report,
	});
//#endregion
