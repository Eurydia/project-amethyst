import {
	getTopicAll,
	getVehicle,
	getVehicleReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportGeneralFormData,
} from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoEditPageLoaderData = {
	reportId: string;
	topicOptions: string[];
	vehicleOptions: VehicleModel[];
	initFormData: VehicleReportGeneralFormData;
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		const { reportId } = params;
		if (reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const report = await getVehicleReportGeneral(
			Number.parseInt(reportId),
		);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleGeneralReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const vehicle = await getVehicle(
			report.vehicle_id,
		);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const vehicleOptions = [vehicle];
		const initFormData: VehicleReportGeneralFormData =
			{
				vehicle,
				content: report.content,
				datetime: report.datetime,
				title: report.title,
				topics: report.topics
					.normalize()
					.split(",")
					.map((topic) => topic.trim())
					.filter((topic) => topic.length > 0),
			};

		const loaderData: InfoEditPageLoaderData = {
			reportId,
			vehicleOptions,
			topicOptions,
			initFormData,
		};

		return loaderData;
	};
