import {
	getPickupRouteAll,
	getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	PickupRouteModel,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: PickupRouteReportFormData;
	routeSelectOptions: PickupRouteModel[];
	topicComboBoxOptions: string[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const routeSelectOptions =
			await getPickupRouteAll();
		if (routeSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
			);
		}
		const route = routeSelectOptions[0];
		const topicComboBoxOptions =
			await getTopicAll();
		const initFormData: PickupRouteReportFormData =
			{
				datetime: dayjs().format(),
				content: "",
				title: "",
				route,
				topics: [],
			};

		const loaderData: NewPageLoaderData = {
			initFormData,
			routeSelectOptions,
			topicComboBoxOptions,
		};

		return loaderData;
	};
