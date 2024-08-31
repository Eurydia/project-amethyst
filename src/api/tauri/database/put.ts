import { PickupRouteFormData } from "$types/form-data";
import {
	DriverFormData,
	DriverReportFormData,
} from "$types/models/Driver";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";

export const postDriverReport = async (
	formData: DriverReportFormData,
): Promise<number> => {
	return 0;
};

export const postPickupRouteReportGeneral =
	async (formData: PickupRouteReportFormData) => {
		return 0;
	};

export const postDriver = async (
	formData: DriverFormData,
): Promise<number> => {
	return 0;
};
export const postPickupRoute = async (
	formData: PickupRouteFormData,
): Promise<number> => {
	return 0;
};
