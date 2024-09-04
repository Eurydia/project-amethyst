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
	routeId: string;
	routeOptions: PickupRouteModel[];
	topicOptions: string[];
	initFormData: PickupRouteReportFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}

		const route = await getPickupRoute(
			Number.parseInt(routeId),
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
				route,
				datetime: dayjs().format(),
				content: "",
				title: "",
				topics: [],
			};
		const loaderData: ReportGeneralPageLoaderData =
			{
				routeId,
				routeOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
