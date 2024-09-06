import { getPickupRouteAll } from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import { PickupRouteModelImpl } from "$types/impl/PickupRoute";
import { PickupRouteEntry } from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	routeEntries: PickupRouteEntry[];
	routeMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const routes = await getPickupRouteAll();

		const routeMultiSelectOptions = routes.map(
			PickupRouteModelImpl.toMultiSelectOption,
		);

		const routeEntries = await Promise.all(
			routes.map(PickupRouteModelImpl.toEntry),
		);

		const loaderData: IndexPageLoaderData = {
			routeEntries,
			routeMultiSelectOptions,
		};
		return loaderData;
	};
