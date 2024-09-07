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
	vehicleSelectOptions: VehicleModel[];
	initFormData: VehicleReportGeneralFormData;
};
export const infoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const reportId = parseInt(params.reportId);
		const report = await getVehicleReportGeneral(
			reportId,
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
		const topicComboBoxOptions =
			await getTopicAll();
		const vehicleSelectOptions = [vehicle];
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
			vehicleSelectOptions,
			topicComboBoxOptions,
			initFormData,
		};

		return loaderData;
	};
