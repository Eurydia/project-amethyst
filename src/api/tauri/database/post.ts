import {
	DriverFormData,
	DriverReportFormData,
} from "$types/models/Driver";
import {
	PickupRouteFormData,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import {
	VehicleFormData,
	VehicleReportGeneralFormData,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";

//#region Driver
export const postDriver = async (
	driver: DriverFormData,
): Promise<number> => {
	return 0;
};
export const postDriverReportGeneral = async (
	report: DriverReportFormData,
) => {
	return 0;
};
export const postDriverReportMedical = async (
	report: DriverReportFormData,
) => {
	return 0;
};
//#endregion

//#region Pickup Route
export const postPickupRoute = async (
	route: PickupRouteFormData,
): Promise<number> => {
	return 0;
};
export const postPickupRouteReportGeneral =
	async (report: PickupRouteReportFormData) => {
		return 0;
	};
//#endregion

//#region Vehicle
export const postVehicle = async (
	vehicle: VehicleFormData,
) => {};
export const postVehicleReportGeneral = async (
	report: VehicleReportGeneralFormData,
) => {
	return 0;
};
export const postVehicleReportInspection = async (
	report: VehicleReportInspectionFormData,
) => {
	return 0;
};
//#endregion
