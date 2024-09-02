import {
	getPickupRouteReportGeneral,
	getPickupRoute,
	getTopicAll,
} from "$backend/database/get";
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
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (400-Missing report ID in params)",
				},
				{ status: 400 },
			);
		}

		const rawEntry =
			await getPickupRouteReportGeneral(reportId);
		if (rawEntry === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบรายการในฐานข้อมูล (404-Cannot find report with given ID)",
				},
				{ status: 404 },
			);
		}

		const route = await getPickupRoute(
			rawEntry.route_id,
		);

		if (route === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับในฐานข้อมูล (404-Cannot find driver with ID given in report entry)",
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const routeOptions = [route];
		const initFormData: PickupRouteReportFormData =
			{
				content: rawEntry.content,
				datetime: rawEntry.datetime,
				title: rawEntry.title,
				topics: rawEntry.topics.split(","),
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
