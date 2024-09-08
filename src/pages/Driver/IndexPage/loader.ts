import { getDriverAll } from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import { DriverModelImpl } from "$types/impl/Driver";
import { DriverEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	driverEntries: DriverEntry[];
	driverMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const drivers = await getDriverAll();

		const driverEntries = (
			await Promise.all(
				drivers.map(DriverModelImpl.toEntry),
			)
		).filter((entry) => entry !== null);

		const driverMultiSelectOptions = drivers.map(
			DriverModelImpl.toMultiSelectOption,
		);

		const loaderData: IndexPageLoaderData = {
			driverEntries,
			driverMultiSelectOptions,
		};
		return loaderData;
	};
