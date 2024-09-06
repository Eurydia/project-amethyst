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
		const report =
			await getPickupRouteReportGeneral(
				Number.parseInt(reportId),
			);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteGeneralReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const route = await getPickupRoute(
			report.route_id,
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

		const loaderData: InfoPageLoaderData = {
			report,
			route,
		};

		return loaderData;
	};
