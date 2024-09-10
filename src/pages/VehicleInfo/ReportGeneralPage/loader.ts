import {
	getTopicAll,
	getVehicle,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportGeneralFormData,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import "dayjs/locale/th";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type ReportGeneralPageLoaderData = {
	topicComboBoxOptions: string[];
	vehicleSelectOptions: VehicleModel[];
	initFormData: VehicleReportGeneralFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.vehicleId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
			);
		}
		const vehicleId = Number.parseInt(
			params.vehicleId,
		);
		const vehicle = await getVehicle(vehicleId);
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
		const vehicleSelectOptions = [vehicle];
		const initFormData: VehicleReportGeneralFormData =
			{
				vehicle,
				datetime: dayjs().format(),
				content: "",
				title: "",
				topics: [],
			};
		const loaderData: ReportGeneralPageLoaderData =
			{
				vehicleSelectOptions,
				initFormData,
				topicComboBoxOptions,
			};

		return loaderData;
	};
