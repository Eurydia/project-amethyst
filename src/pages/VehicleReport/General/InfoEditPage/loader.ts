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
	reportId: number;
	topicComboBoxOptions: string[];
	vehicle: VehicleModel;
	initFormData: VehicleReportGeneralFormData;
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.vehicleReportIdIsMissingFromParams,
				},
			);
		}
		const reportId = parseInt(params.reportId);
		const report = await getVehicleReportGeneral(
			reportId,
		);
		if (report === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.vehicleGeneralReportIsMissingFromDatabase,
				},
			);
		}
		const vehicle = await getVehicle(
			report.vehicle_id,
		);
		if (vehicle === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.errorVehicleIsMissingFromDatabase,
				},
			);
		}
		const topicComboBoxOptions =
			await getTopicAll();
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
			vehicle,
			topicComboBoxOptions,
			initFormData,
		};

		return loaderData;
	};
