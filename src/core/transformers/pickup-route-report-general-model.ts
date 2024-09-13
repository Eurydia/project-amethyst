import { getPickupRoute } from "$backend/database/get";
import {
	PickupRouteReportEntry,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";

export const PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER =
	{
		toPickupRouteReportGeneralEntry: async (
			report: PickupRouteReportModel,
		) => {
			const route = await getPickupRoute(
				report.route_id,
			);
			if (route === null) {
				return null;
			}
			const entry: PickupRouteReportEntry = {
				datetime: report.datetime,
				id: report.id,
				title: report.title,
				topics: report.topics.split(","),

				routeId: route.id,
				routeName: route.name,
			};
			return entry;
		},
	};
