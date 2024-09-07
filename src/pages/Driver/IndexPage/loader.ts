import { getDriverAll } from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import { DriverModelImpl } from "$types/impl/Driver";
import { DriverEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: DriverEntry[];
	driverMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const drivers = await getDriverAll();

		const entries = (
			await Promise.all(
				drivers.map(DriverModelImpl.toEntry),
			)
		).filter((entry) => entry !== null);

		const driverMultiSelectOptions = drivers.map(
			DriverModelImpl.toMultiSelectOption,
		);

		const loaderData: IndexPageLoaderData = {
			entries,
			driverMultiSelectOptions,
		};
		return loaderData;
	};
