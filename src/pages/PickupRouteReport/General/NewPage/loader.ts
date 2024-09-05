import { getPickupRoute } from "$backend/database/get";
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
	route: PickupRouteModel;
	initFormData: PickupRouteReportFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const route = await getPickupRoute(1);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
				{ status: 400 },
			);
		}

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
			route,
		};

		return loaderData;
	};
