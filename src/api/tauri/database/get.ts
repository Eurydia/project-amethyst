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

//#region Topics
export const getTopicAll =
	async (): Promise<string> =>
		invoke("get_topic_all");
//#endregion

//#region Operational Log
export const getOperationLogAll = async () => {
	const entries: OperationalLogModel[] =
		await invoke("get_operational_log_all");
	return entries;
};

export const getOperationLogToday = async () => {
	const entries: OperationalLogModel[] =
		await invoke("get_operational_log_today");
	return entries;
};

//#endregion

//#region drivers
export const getDriverAll = async () => {
	const entries: DriverModel[] = await invoke(
		"get_driver_all",
	).then(
		(ok) => ok as DriverModel[],
		(err) => {
			console.error(err);
			return [];
		},
	);
	return entries;
};

export const getDriver = async (
	driverId: number,
) => {
	const entry = await invoke("get_driver", {
		driverId,
	}).then(
		(ok) => ok as DriverModel | null,
		() => null,
	);

	return entry;
};

//#region Driver general report
export const getDriverReportGeneralAll =
	async () => {
		const entry: DriverReportModel[] =
			await invoke(
				"get_driver_report_general_all",
			);
		return entry;
	};

export const getDriverReportGeneral = async (
	reportId: number,
) => {
	const entry: DriverReportModel | null =
		await invoke("get_driver_report_general", {
			report_id: reportId,
		});
	return entry;
};
//#endregion

//#region Driver Report Medical
export const getDriverReportMedicalAll =
	async () => {
		const entries: DriverReportModel[] =
			await invoke(
				"get_driver_report_medical_all",
			);
		return entries;
	};
export const getDriverReportMedical = async (
	reportId: number,
) => {
	const entry: DriverReportModel | null =
		await invoke("get_driver_report_medical", {
			report_id: reportId,
		});
	return entry;
};
//#endregion

//#region Vehicle
export const getVehicleAll = async () => {
	const entries: VehicleModel[] = await invoke(
		"get_vehicle_all",
	);
	return entries;
};
export const getVehicle = async (
	vehicleId: number | string,
) => {
	const entry: VehicleModel | null = await invoke(
		"get_vehicle",
		{
			vehicleId,
		},
	);
	return entry;
};
//#endregion

//#region Vehicle Report General
export const getVehicleReportGeneralAll =
	async () => {
		const entries: VehicleReportGeneralModel[] =
			await invoke(
				"get_vehicle_report_general_all",
			);
		return entries;
	};

export const getVehicleReportGeneral = async (
	reportId: number,
) => {
	const entry: VehicleReportGeneralModel | null =
		await invoke("get_vehicle_report_general", {
			report_id: reportId,
		});

	return entry;
};
//#endregion

//#region Vehicle Report Inspection
export const getVehicleReportInspectionAll =
	async () => {
		const entries: VehicleReportInspectionModel[] =
			await invoke(
				"get_vehicle_report_inspection_all",
			);
		return entries;
	};
export const getVehicleReportInspection = async (
	reportId: number,
) => {
	const entry: VehicleReportInspectionModel | null =
		await invoke(
			"get_vehicle_report_inspection",
			{
				report_id: reportId,
			},
		);
	return entry;
};
//#endregion

//#region Pickup Route
export const getPickupRouteAll = async () => {
	const entries: PickupRouteModel[] =
		await invoke("get_pickup_route_all");
	return entries;
};
export const getPickupRoute = async (
	routeId: number,
) => {
	const entry: PickupRouteModel | null =
		await invoke("get_pickup_route", {
			routeId,
		});
	return entry;
};
//#endregion

//#region Pickup Route Report General
export const getPickupRouteReportGeneralAll =
	async () => {
		const entries: PickupRouteReportModel[] =
			await invoke(
				"get_pickup_route_report_general_all",
			);
		return entries;
	};

export const getPickupRouteReportGeneral = async (
	reportId: number,
) => {
	const entry: PickupRouteReportModel | null =
		await invoke(
			"get_pickup_route_report_general",
			{
				reportId,
			},
		);
	return entry;
};
//#endregion

//#region Attendance Log
export const getAttendanceLogAll =
	async (): Promise<AttendanceLogModel[]> =>
		invoke("get_attendance_log_all");

export const getAttendanceLogToday =
	async (): Promise<AttendanceLogModel[]> =>
		invoke("get_attendance_log_today");

//#endregion
