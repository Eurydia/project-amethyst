import {
	getTopicAll,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	vehicleSelectOptions: VehicleModel[];
	topicComboBoxOptions: string[];
	initFormData: VehicleReportInspectionFormData;
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

		const initFormData: VehicleReportInspectionFormData =
			{
				datetime: dayjs().format(),
				vehicle,
				frame: "",
				windows: "",
				frontCamera: "",
				content: "",
				overheadFan: "",
				brakeLight: "",
				headlights: "",
				turnSignals: "",
				rearviewMirror: "",
				sideviewMirror: "",
				seatbelts: "",
				seats: "",
				tires: "",
				topics: [],
			};
		const loaderData: NewPageLoaderData = {
			initFormData,
			topicComboBoxOptions,
			vehicleSelectOptions,
		};

		return loaderData;
	};
