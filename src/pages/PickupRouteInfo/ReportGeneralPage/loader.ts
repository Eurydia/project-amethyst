import {
	getPickupRoute,
	getTopicAll,
} from "$backend/database/get";
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
	driverOptions: PickupRouteModel[];
	topicOptions: string[];
	initFormData: PickupRouteReportFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{ message: "ข้อมูลคนขับรถไม่ถูกต้อง" },
				{ status: 400 },
			);
		}

		const route = await getPickupRoute(routeId);
		if (route === null) {
			throw json(
				{ message: "ไม่พบข้อมูลคนขับรถ" },
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const driverOptions = [route];
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
				driverOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
