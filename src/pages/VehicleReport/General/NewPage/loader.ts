import {
	getTopicAll,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportGeneralFormData,
} from "$types/models/vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	vehicleSelectOptions: VehicleModel[];
	topicComboBoxOptions: string[];
	initFormData: VehicleReportGeneralFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const vehicleSelectOptions =
			await getVehicleAll();
		if (vehicleSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.errorNoVehicleInDatabase,
				},
			);
		}
		const vehicle = vehicleSelectOptions[0];
		const topicComboBoxOptions =
			await getTopicAll();
		const initFormData: VehicleReportGeneralFormData =
			{
				vehicle,
				datetime: dayjs().format(),
				content: "",
				title: "",
				topics: [],
			};

		const loaderData: NewPageLoaderData = {
			initFormData,
			topicComboBoxOptions,
			vehicleSelectOptions,
		};

		return loaderData;
	};
