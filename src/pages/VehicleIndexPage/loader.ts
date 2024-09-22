/** @format */

import { tauriGetVehicleVendorAll } from "$backend/database/get/vehicle-vendors";
import { tauriGetVehicleAll } from "$backend/database/get/vehicles";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle-model";
import { VehicleEntry } from "$types/models/vehicle";
import { LoaderFunction } from "react-router-dom";

export type VehicleIndexPageLoaderData = {
	vehicleEntries: VehicleEntry[];
	vendorComboBoxOptions: string[];
};
export const vehicleIndexPageLoader: LoaderFunction = async () => {
	const vehicles = await tauriGetVehicleAll();
	const vehicleEntries = await Promise.all(
		vehicles.map(VEHICLE_MODEL_TRANSFORMER.toVehicleEntry)
	);

	const vendorComboBoxOptions = await tauriGetVehicleVendorAll();

	const loaderData: VehicleIndexPageLoaderData = {
		vehicleEntries,
		vendorComboBoxOptions,
	};
	return loaderData;
};
