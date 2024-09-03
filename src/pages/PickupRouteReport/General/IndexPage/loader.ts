import {
	getPickupRoute,
	getPickupRouteReportGeneralAll,
} from "$backend/database/get";
import {
	PickupRouteModel,
	PickupRouteReportEntry,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

const toEntry = async (
	report: PickupRouteReportModel,
	route: PickupRouteModel,
) => {
	const entry: PickupRouteReportEntry = {
		id: report.id,
		datetime: report.datetime,
		title: report.title,
		topics: report.topics.split(","),

		routeId: route.id,
		routeName: route.name,
	};

	return entry;
};

export type IndexPageLoaderData = {
	entries: PickupRouteReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports =
			await getPickupRouteReportGeneralAll();

		const entries: PickupRouteReportEntry[] = [];
		for (const report of reports) {
			const route = await getPickupRoute(
				report.route_id,
			);
			if (route === null) {
				continue;
			}
			const entry = await toEntry(report, route);
			entries.push(entry);
		}
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
