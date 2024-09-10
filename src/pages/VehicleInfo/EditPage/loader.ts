import {
	getVehicle,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { VehicleFormData } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	vehicleId: number;
	initFormData: VehicleFormData;
	vendorSelectOptions: string[];
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.vehicleId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
			);
		}
		const vehicleId = Number.parseInt(
			params.vehicleId,
		);
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.errorVehicleIsMissingFromDatabase,
				},
			);
		}
		const vehicleAll = await getVehicleAll();

		const vendors = new Set<string>();
		for (const { vendor } of vehicleAll) {
			vendors.add(vendor);
		}
		const vendorSelectOptions = [...vendors];

		const initFormData: VehicleFormData = {
			licensePlate: vehicle.license_plate,
			registeredCity: vehicle.registered_city,
			vehicleClass: vehicle.vehicle_class,
			vendor: vehicle.vendor,
		};
		const loaderData: EditPageLoaderData = {
			vehicleId,
			initFormData,
			vendorSelectOptions,
		};
		return loaderData;
	};
