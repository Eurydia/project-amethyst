import {
	DriverFormData,
	DriverReportModel,
} from "$types/models/Driver";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import {
	PickupRouteFormData,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import {
	VehicleFormData,
	VehicleReportGeneralModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { invoke } from "@tauri-apps/api/tauri";

//#region Attendance log
export const postAttendanceLog = async ({
	driverId,
	vehicleId,
	routeId,
	expectedArrivalDatetime,
	expectedDepartureDatetime,
}: {
	driverId: number;
	vehicleId: number;
	routeId: number;
	expectedArrivalDatetime: string;
	expectedDepartureDatetime: string;
}) =>
	invoke("post_attendance_log", {
		driverId,
		vehicleId,
		routeId,

		expectedArrivalDatetime,
		expectedDepartureDatetime,
	});
//#endregion

//#region Operational Log
export const postOperationalLog = async (
	log: OperationalLogFormData,
): Promise<number> =>
	invoke("post_operational_log", log);
//#endregion

//#region Driver
export const postDriver = async (
	formData: DriverFormData,
) => invoke("post_driver", formData);
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
	formData: PickupRouteFormData,
) => {
	const routeId: number = await invoke(
		"post_pickup_route",
		formData,
	);
	return routeId;
};
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
	formData: VehicleFormData,
) => invoke("post_vehicle", formData);
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
