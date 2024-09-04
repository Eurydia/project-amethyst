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
	reportId: string;
	topicOptions: string[];
	routeOptions: PickupRouteModel[];
	initFormData: PickupRouteReportFormData;
};
export const infoEditPageLoader: LoaderFunction =
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
		const topicOptions = await getTopicAll();
		const routeOptions = [route];
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
			routeOptions,
			topicOptions,
			initFormData,
		};

		return loaderData;
	};
