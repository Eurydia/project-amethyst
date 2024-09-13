import {
	getTopicAll,
	getVehicle,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportInspectionFormData,
} from "$types/models/vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type ReportInspectionPageLoaderData = {
	vehicleSelectOptions: VehicleModel[];
	topicComboBoxOptions: string[];
	initFormData: VehicleReportInspectionFormData;
};
export const reportInspectionPageLoader: LoaderFunction =
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

		const initFormData: VehicleReportInspectionFormData =
			{
				vehicle,
				topics: [],
				datetime: dayjs().format(),
				content: "",

				frame: "",
				windows: "",
				frontCamera: "",
				overheadFan: "",
				brakeLight: "",
				headlights: "",
				turnSignals: "",
				rearviewMirror: "",
				sideviewMirror: "",
				seatbelts: "",
				seats: "",
				tires: "",
			};

		const loaderData: ReportInspectionPageLoaderData =
			{
				vehicleSelectOptions,
				initFormData,
				topicComboBoxOptions,
			};

		return loaderData;
	};
