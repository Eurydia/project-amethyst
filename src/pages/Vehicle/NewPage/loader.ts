import { getVehicleAll } from "$backend/database/get";
import { VehicleFormData } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: VehicleFormData;
	vendorOptions: string[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const vehicles = await getVehicleAll();
		const uniqueVendors = new Set(
			vehicles.map(({ vendor }) => vendor),
		);
		const vendorOptions = [...uniqueVendors];

		const initFormData: VehicleFormData = {
			licensePlate: "",
			vendor: "",
			vehicleClass: "รถตู้",
			registeredCity: "",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
			vendorOptions,
		};
		return loaderData;
	};
