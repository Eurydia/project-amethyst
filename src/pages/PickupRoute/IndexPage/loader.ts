import { getPickupRouteAll } from "$backend/database/get";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-model";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	routeEntries: PickupRouteEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const routes = await getPickupRouteAll();

		const routeEntries = await Promise.all(
			routes.map(
				PICKUP_ROUTE_MODEL_TRANSFORMER.toPickupRouteEntry,
			),
		);

		const loaderData: IndexPageLoaderData = {
			routeEntries,
		};
		return loaderData;
	};
