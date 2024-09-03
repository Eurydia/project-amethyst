import {
	getPickupRoute,
	getPickupRouteReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { PickupRouteReport } from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: PickupRouteReport;
};
export const infoPageLoader: LoaderFunction =
	async ({ params }) => {
		const { reportId } = params;
		if (reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteGeneralReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const _report =
			await getPickupRouteReportGeneral(reportId);
		if (_report === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteGeneralReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const route = await getPickupRoute(
			_report.route_id,
		);

		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const report: PickupRouteReport = {
			content: _report.content,
			datetime: _report.datetime,
			id: _report.id,
			title: _report.title,
			routeId: _report.route_id,
			routeName: route.name,
			topics: _report.topics
				.normalize()
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),
		};

		const loaderData: InfoPageLoaderData = {
			report,
		};

		return loaderData;
	};
