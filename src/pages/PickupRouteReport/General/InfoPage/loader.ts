import {
	getPickupRoute,
	getPickupRouteReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: PickupRouteReportModel;
	route: PickupRouteModel;
};
export const infoPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.pickupRouteGeneralReportIdIsMissingFromParams,
				},
			);
		}
		const reportId = Number.parseInt(
			params.reportId,
		);
		const report =
			await getPickupRouteReportGeneral(reportId);
		if (report === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.pickupRouteGeneralReportIsMissingFromDatabase,
				},
			);
		}
		const route = await getPickupRoute(
			report.route_id,
		);
		if (route === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
			);
		}

		const loaderData: InfoPageLoaderData = {
			report,
			route,
		};

		return loaderData;
	};
