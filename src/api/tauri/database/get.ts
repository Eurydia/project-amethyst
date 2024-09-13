import { AttendanceLogModel } from "$types/models/attendance-log";
import {
	DriverModel,
	DriverReportModel,
} from "$types/models/driver";
import { OperationalLogModel } from "$types/models/operational-log";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/pickup-route";
import {
	VehicleModel,
	VehicleReportGeneralModel,
	VehicleReportInspectionModel,
} from "$types/models/vehicle";
import { invoke } from "@tauri-apps/api/tauri";

//#region Topics
export const getTopicAll = async (): Promise<
	string[]
> => invoke("get_topic_all");
//#endregion

//#region Operational Log
export const getOperationLogAll =
	async (): Promise<OperationalLogModel[]> =>
		invoke("get_operational_log_all");

export const getOperationLogToday =
	async (): Promise<OperationalLogModel[]> =>
		invoke("get_operational_log_today");
//#endregion

//#region drivers
export const getDriverAll = async (): Promise<
	DriverModel[]
> => invoke("get_driver_all");

export const getDriver = async (
	driverId: number,
): Promise<DriverModel | null> =>
	invoke("get_driver", {
		driverId,
	});

//#region Driver general report
export const getDriverReportGeneralAll =
	async (): Promise<DriverReportModel[]> =>
		invoke("get_driver_report_general_all");

export const getDriverReportGeneral = async (
	reportId: number,
): Promise<DriverReportModel | null> =>
	invoke("get_driver_report_general", {
		reportId,
	});
//#endregion

//#region Driver Report Medical
export const getDriverReportMedicalAll =
	async (): Promise<DriverReportModel[]> =>
		invoke("get_driver_report_medical_all");
export const getDriverReportMedical = async (
	reportId: number,
): Promise<DriverReportModel | null> =>
	invoke("get_driver_report_medical", {
		reportId,
	});
//#endregion

//#region Vehicle
export const getVehicleAll = async () => {
	const entries: VehicleModel[] = await invoke(
		"get_vehicle_all",
	);
	return entries;
};
export const getVehicle = async (
	vehicleId: number,
): Promise<VehicleModel | null> =>
	invoke("get_vehicle", {
		vehicleId,
	});
//#endregion

//#region Vehicle Report General
export const getVehicleReportGeneralAll =
	async (): Promise<
		VehicleReportGeneralModel[]
	> =>
		await invoke(
			"get_vehicle_report_general_all",
		);

export const getVehicleReportGeneral = async (
	reportId: number,
): Promise<VehicleReportGeneralModel | null> =>
	invoke("get_vehicle_report_general", {
		reportId,
	});
//#endregion

//#region Vehicle Report Inspection
export const getVehicleReportInspectionAll =
	async (): Promise<
		VehicleReportInspectionModel[]
	> =>
		invoke("get_vehicle_report_inspection_all");
export const getVehicleReportInspection = async (
	reportId: number,
): Promise<VehicleReportInspectionModel | null> =>
	invoke("get_vehicle_report_inspection", {
		reportId,
	});
//#endregion

//#region Pickup Route
export const getPickupRouteAll = async () => {
	const entries: PickupRouteModel[] =
		await invoke("get_pickup_route_all");
	return entries;
};
export const getPickupRoute = async (
	routeId: number,
): Promise<PickupRouteModel | null> =>
	invoke("get_pickup_route", { routeId });
//#endregion

//#region Pickup Route Report General
export const getPickupRouteReportGeneralAll =
	async (): Promise<PickupRouteReportModel[]> =>
		await invoke(
			"get_pickup_route_report_general_all",
		);

export const getPickupRouteReportGeneral = async (
	reportId: number,
): Promise<PickupRouteReportModel | null> =>
	invoke("get_pickup_route_report_general", {
		reportId,
	});
//#endregion

//#region Attendance Log
export const getAttendanceLogAll =
	async (): Promise<AttendanceLogModel[]> =>
		invoke("get_attendance_log_all");

export const getAttendanceLogToday =
	async (): Promise<AttendanceLogModel[]> =>
		invoke("get_attendance_log_today");
//#endregion
