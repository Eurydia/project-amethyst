import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import {
	VehicleModel,
	VehicleReportGeneralModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";

//#region Driver
export const putDriver = async (
	model: DriverModel,
): Promise<number> => {
	return 0;
};
export const putDriverReportGeneral = async (
	report: DriverReportModel,
) => {
	return 0;
};
export const putDriverReportMedical = async (
	report: DriverReportModel,
) => {
	return 0;
};
//#endregion

//#region Pickup Route
export const putPickupRoute = async (
	model: PickupRouteModel,
): Promise<number> => {
	return 0;
};
export const putPickupRouteReportGeneral = async (
	report: PickupRouteReportModel,
) => {
	return 0;
};
//#endregion

//#region Vehicle
export const putVehicle = async (
	model: VehicleModel,
) => {};
export const putVehicleReportGeneral = async (
	report: VehicleReportGeneralModel,
) => {
	return 0;
};
export const putVehicleReportInspection = async (
	report: VehicleReportInspectionModel,
) => {
	return 0;
};
//#endregion
