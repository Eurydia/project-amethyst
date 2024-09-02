import { getVehicleAll } from "$backend/database/get";
import { VehicleFormData } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const resolveVendors = async () => {
	const vehicles = await getVehicleAll();
	const uniqueVendors = new Set(
		vehicles.map(({ vendor }) => vendor),
	);
	return [...uniqueVendors];
};

export type NewPageLoaderData = {
	initFormData: VehicleFormData;
	vendorOptions: string[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const vendorOptions = await resolveVendors();
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
