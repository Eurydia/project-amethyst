import {
	getPickupRoute,
	getPickupRouteAll,
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
	routeSelectOptions: PickupRouteModel[];
	reportId: number;
	initFormData: PickupRouteReportFormData;
	topicComboBoxOptions: string[];
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteGeneralReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const reportId = Number.parseInt(
			params.reportId,
		);
		const report =
			await getPickupRouteReportGeneral(reportId);
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

		const topicComboBoxOptions =
			await getTopicAll();
		const routeSelectOptions =
			await getPickupRouteAll();

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
			routeSelectOptions,
			topicComboBoxOptions,
		};

		return loaderData;
	};
