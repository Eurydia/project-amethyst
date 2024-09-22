/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import {} from "$types/models/pickup-route";
import {
	PickupRouteReportGeneralEntry,
	PickupRouteReportGeneralModel,
} from "$types/models/pickup-route-report-general";

export const PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER = {
	toPickupRouteReportGeneralEntry: async (
		report: PickupRouteReportGeneralModel
	) => {
		const route = await tauriGetPickupRoute(report.report_id);
		if (route === null) {
			return null;
		}
		const entry: PickupRouteReportGeneralEntry = {
			datetime: report.datetime,
			id: report.report_id,
			title: report.title,
			topics: report.topics.split(","),

			routeId: route.id,
			routeName: route.name,
		};
		return entry;
	},
};
