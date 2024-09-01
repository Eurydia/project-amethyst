import {
	getPickupRouteReportGeneralAll,
	getPickupRoute,
} from "$backend/database/get";
import { PickupRouteReport } from "$types/models";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: PickupRouteReport[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const rawEntries =
			await getPickupRouteReportGeneralAll();

		const entryRequests: Promise<PickupRouteReport | null>[] =
			rawEntries.map(async (rawEntry) => {
				const route = await getPickupRoute(
					rawEntry.id,
				);
				if (route === null) {
					return null;
				}

				const entry: PickupRouteReport = {
					id: rawEntry.id,
					topics: rawEntry.topics.split(","),
					datetime: rawEntry.datetime,
					title: rawEntry.title,
					content: rawEntry.content,
					routeId: rawEntry.route_id,

					routeName: route.name,
				};

				return entry;
			});
		const entries = (
			await Promise.all(entryRequests)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
