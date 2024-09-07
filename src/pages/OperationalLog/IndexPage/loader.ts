import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import { DriverModelImpl } from "$types/impl/Driver";
import { OperationalLogModelImpl } from "$types/impl/OperationalLog";
import { PickupRouteModelImpl } from "$types/impl/PickupRoute";
import { VehicleModelImpl } from "$types/impl/Vehicle";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	driverMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
	routeMultiSelectOptions: MultiSelectOption[];
	entries: OperationalLogEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const driverMultiSelectOptions = (
			await getDriverAll()
		).map(DriverModelImpl.toMultiSelectOption);

		const vehicleMultiSelectOptions = (
			await getVehicleAll()
		).map(VehicleModelImpl.toMultiSelectOption);

		const routeMultiSelectOptions: MultiSelectOption[] =
			(await getPickupRouteAll()).map(
				PickupRouteModelImpl.toMultiSelectOption,
			);

		const logs = (await getOperationLogAll()).map(
			OperationalLogModelImpl.toEntry,
		);
		const entries = (
			await Promise.all(logs)
		).filter((log) => log !== null);

		const loaderData: IndexPageLoaderData = {
			entries,
			driverMultiSelectOptions,
			routeMultiSelectOptions,
			vehicleMultiSelectOptions,
		};
		return loaderData;
	};
