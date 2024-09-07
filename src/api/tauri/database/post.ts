import {
	DriverFormData,
	DriverReportFormData,
} from "$types/models/Driver";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import {
	PickupRouteFormData,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import {
	VehicleFormData,
	VehicleReportGeneralFormData,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import { invoke } from "@tauri-apps/api/tauri";

//#region Operational Log
export const postOperationalLog = async (
	log: OperationalLogFormData,
) => invoke("post_operational_log", log);
//#endregion

//#region Driver
export const postDriver = async (
	driver: DriverFormData,
): Promise<number> =>
	invoke("post_driver", driver);

export const postDriverReportGeneral = async (
	report: DriverReportFormData,
): Promise<number> =>
	invoke("post_driver_report_general", report);

export const postDriverReportMedical = async (
	report: DriverReportFormData,
): Promise<number> =>
	invoke("post_driver_report_medical", report);
//#endregion

//#region Pickup Route
export const postPickupRoute = async (
	route: PickupRouteFormData,
): Promise<number> =>
	invoke("post_pickup_route", route);

export const postPickupRouteReportGeneral =
	async (
		report: PickupRouteReportFormData,
	): Promise<number> =>
		invoke(
			"post_pickup_route_report_general",
			report,
		);
//#endregion

//#region Vehicle
export const postVehicle = async (
	vehicle: VehicleFormData,
): Promise<number> =>
	invoke("post_vehicle", vehicle);

export const postVehicleReportGeneral = async (
	report: VehicleReportGeneralFormData,
): Promise<number> =>
	invoke("post_vehicle_report_general", report);
export const postVehicleReportInspection = async (
	report: VehicleReportInspectionFormData,
): Promise<number> =>
	invoke(
		"post_vehicle_report_inspection",
		report,
	);
//#endregion
