import {
	getPickupRoute,
	getPickupRouteReportGeneral,
	getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	PickupRouteModel,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoEditPageLoaderData = {
	route: PickupRouteModel;
	reportId: number;
	initFormData: PickupRouteReportFormData;
	topicComboBoxOptions: string[];
};
export const infoEditPageLoader: LoaderFunction =
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

		const topicComboBoxOptions =
			await getTopicAll();
		const initFormData: PickupRouteReportFormData =
			{
				content: report.content,
				datetime: report.datetime,
				title: report.title,
				topics: report.topics
					.normalize()
					.split(",")
					.map((topic) => topic.trim())
					.filter((topic) => topic.length > 0),

				route,
			};

		const loaderData: InfoEditPageLoaderData = {
			reportId,
			initFormData,
			route,
			topicComboBoxOptions,
		};

		return loaderData;
	};
