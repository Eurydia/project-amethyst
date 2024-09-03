import {
	getPickupRouteAll,
	getPickupRouteReportGeneralAll,
} from "$backend/database/get";
import {
	PickupRouteModel,
	PickupRouteReportEntry,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	report: PickupRouteReportModel,
	route: PickupRouteModel,
) => {
	const entry: PickupRouteReportEntry = {
		id: report.id,
		datetime: report.datetime,
		title: report.title,
		topics: report.topics
			.normalize()
			.split(",")
			.map((topic) => topic.trim())
			.filter((topic) => topic.length > 0),

		routeId: route.id,
		routeName: route.name,
	};

	return entry;
};

const toEntries = (
	reportAll: PickupRouteReportModel[],
	routeAll: PickupRouteModel[],
) => {
	const entries = [];
	for (const report of reportAll) {
		const route = routeAll.find(
			({ id }) => id === report.route_id,
		);
		if (route === undefined) {
			continue;
		}
		const entry = toEntry(report, route);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: PickupRouteReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reportAll =
			await getPickupRouteReportGeneralAll();
		const routeAll = await getPickupRouteAll();
		const entries = toEntries(
			reportAll,
			routeAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
