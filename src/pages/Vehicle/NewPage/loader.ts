import { getVehicleAll } from "$backend/database/get";
import { VehicleFormData } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: VehicleFormData;
	vendorSelectOptions: string[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const vehicles = await getVehicleAll();
		const vendors = new Set<string>();

		for (const vehicle of vehicles) {
			vendors.add(vehicle.vendor);
		}
		const vendorSelectOptions = [...vendors];

		let vendor = "";
		if (vendorSelectOptions.length > 0) {
			vendor = vendorSelectOptions[0];
		}

		const initFormData: VehicleFormData = {
			licensePlate: "",
			vendor,
			vehicleClass: "",
			registeredCity: "",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
			vendorSelectOptions,
		};
		return loaderData;
	};
