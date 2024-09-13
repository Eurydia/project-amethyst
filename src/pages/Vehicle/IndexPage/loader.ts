import { getVehicleAll } from "$backend/database/get";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle-model";
import { VehicleEntry } from "$types/models/vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	vehicleEntries: VehicleEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const vehicles = await getVehicleAll();
		const vehicleEntries = await Promise.all(
			vehicles.map(
				VEHICLE_MODEL_TRANSFORMER.toVehicleEntry,
			),
		);
		const loaderData: IndexPageLoaderData = {
			vehicleEntries,
		};
		return loaderData;
	};
