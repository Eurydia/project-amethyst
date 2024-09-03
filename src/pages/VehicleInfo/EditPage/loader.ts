import {
	getVehicle,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleFormData,
	VehicleModel,
} from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

const toVendorOptions = (
	vehicleAll: VehicleModel[],
) => {
	const vendors = new Set<string>();
	for (const { vendor } of vehicleAll) {
		vendors.add(vendor);
	}
	return [...vendors];
};

export type EditPageLoaderData = {
	vehicleId: string;
	initFormData: VehicleFormData;
	vendorOptions: string[];
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const vehicleAll = await getVehicleAll();
		const vendorOptions =
			toVendorOptions(vehicleAll);

		const initFormData: VehicleFormData = {
			licensePlate: vehicle.license_plate,
			registeredCity: vehicle.registered_city,
			vehicleClass: vehicle.vehicle_class,
			vendor: vehicle.vendor,
		};
		const loaderData: EditPageLoaderData = {
			vehicleId,
			initFormData,
			vendorOptions,
		};
		return loaderData;
	};
