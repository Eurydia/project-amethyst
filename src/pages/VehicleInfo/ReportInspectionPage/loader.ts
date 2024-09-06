import {
	getTopicAll,
	getVehicle,
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

export type ReportInspectionPageLoaderData = {
	vehicleId: number;
	vehicleSelectOptions: VehicleModel[];
	topicComboBoxOptions: string[];
	initFormData: VehicleReportInspectionFormData;
};
export const reportInspectionPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.vehicleId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const vehicleId = Number.parseInt(
			params.vehicleId,
		);
		const vehicle = await getVehicle(vehicleId);
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
				brakeLights: "",
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
				vehicleId,
				vehicleSelectOptions,
				initFormData,
				topicComboBoxOptions,
			};

		return loaderData;
	};
