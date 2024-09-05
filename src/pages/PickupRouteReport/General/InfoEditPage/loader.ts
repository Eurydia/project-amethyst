import {
	getPickupRoute,
	getPickupRouteReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoEditPageLoaderData = {
	reportId: number;
	initFormData: PickupRouteReportFormData;
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
		};

		return loaderData;
	};
