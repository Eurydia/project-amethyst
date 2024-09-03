import { getVehicleAll } from "$backend/database/get";
import { VehicleFormData } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toOptions = async () => {
	const vehicles = await getVehicleAll();
	const vendors = new Set(
		vehicles.map(({ vendor }) => vendor),
	);
	return [...vendors];
};

export type NewPageLoaderData = {
	initFormData: VehicleFormData;
	vendorOptions: string[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const vendorOptions = await toOptions();
		const initFormData: VehicleFormData = {
			licensePlate: "",
			vendor: "",
			vehicleClass: "",
			registeredCity: "",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
			vendorOptions,
		};
		return loaderData;
	};
