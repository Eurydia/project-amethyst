import { getVehicleAll } from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import { VehicleModelImpl } from "$types/impl/Vehicle";
import { VehicleEntry } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: VehicleEntry[];
	vehicleMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const vehicles = await getVehicleAll();
		const entries = await Promise.all(
			vehicles.map(VehicleModelImpl.toEntry),
		);
		const vehicleMultiSelectOptions =
			vehicles.map(
				VehicleModelImpl.toMultiSelectOption,
			);

		const loaderData: IndexPageLoaderData = {
			entries,
			vehicleMultiSelectOptions,
		};
		return loaderData;
	};
