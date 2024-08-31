import {
	getPickupRouteAll,
	getTopicAll,
} from "$backend/database/get";
import {
	PickupRouteModel,
	PickupRouteReportFormData,
} from "$types/models/PickupRoute";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	routeOptions: PickupRouteModel[];
	topicOptions: string[];
	initFormData: PickupRouteReportFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const topicOptions = await getTopicAll();
		const routeOptions =
			await getPickupRouteAll();

		const initFormData: PickupRouteReportFormData =
			{
				datetime: dayjs().format(),
				content: "",
				title: "",
				route: null,
				topics: [],
			};

		const loaderData: NewPageLoaderData = {
			initFormData,
			topicOptions,
			routeOptions,
		};

		return loaderData;
	};
