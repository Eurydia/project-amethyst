import {
	getPickupRoute,
	getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	PickupRouteModel,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import dayjs from "dayjs";
import "dayjs/locale/th";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type ReportGeneralPageLoaderData = {
	route: PickupRouteModel;
	initFormData: PickupRouteReportFormData;
	topicComboBoxOptions: string[];
};
export const reportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.routeId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
			);
		}
		const routeId = Number.parseInt(
			params.routeId,
		);
		const route = await getPickupRoute(routeId);
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
				route,
				datetime: dayjs().format(),
				content: "",
				title: "",
				topics: [],
			};
		const loaderData: ReportGeneralPageLoaderData =
			{
				route,
				initFormData,
				topicComboBoxOptions,
			};

		return loaderData;
	};
