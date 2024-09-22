/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetPickupRouteReportGeneral } from "$backend/database/get/pickup-routes-general-reports";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import { TH_LOCALE } from "$locale/th";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { LoaderFunction, json } from "react-router-dom";

export type PickupRouteReportGeneralInfoPageLoaderData = {
	report: PickupRouteReportGeneralModel;
	route: PickupRouteModel;
	topicComboBoxOptions: string[];
};
export const pickupRouteReportGeneralInfoPageLoader: LoaderFunction = async ({
	params,
}) => {
	if (params.reportId === undefined) {
		throw json(
			{},
			{
				status: 400,
				statusText: TH_LOCALE.pickupRouteGeneralReportIdIsMissingFromParams,
			}
		);
	}
	const reportId = Number.parseInt(params.reportId);
	const report = await tauriGetPickupRouteReportGeneral(reportId);
	if (report === null) {
		throw json(
			{},
			{
				status: 404,
				statusText: TH_LOCALE.pickupRouteGeneralReportIsMissingFromDatabase,
			}
		);
	}
	const route = await tauriGetPickupRoute(report.route_id);
	if (route === null) {
		throw json(
			{},
			{
				status: 404,
				statusText: TH_LOCALE.pickupRouteIsMissingFromDatabase,
			}
		);
	}

	const topicComboBoxOptions = await tauriGetTopicAll();
	const loaderData: PickupRouteReportGeneralInfoPageLoaderData = {
		report,
		route,
		topicComboBoxOptions,
	};

	return loaderData;
};
