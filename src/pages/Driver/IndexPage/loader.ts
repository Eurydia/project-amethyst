import { getDriverAll } from "$backend/database/get";
import { DRIVER_MODEL_TRANSFORMER } from "$core/transformers/driver-model";
import { DriverEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	driverEntries: DriverEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const drivers = (await getDriverAll()).map(
			DRIVER_MODEL_TRANSFORMER.toDriverEntry,
		);

		const driverEntries = (
			await Promise.all(drivers)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			driverEntries,
		};
		return loaderData;
	};
