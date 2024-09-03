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
	vehicleOptions: VehicleModel[];
	topicOptions: string[];
	initFormData: VehicleReportInspectionFormData;
};
export const reportInspectionPageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
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
		const topicOptions = await getTopicAll();
		const vehicleOptions = [vehicle];
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
				vehicleOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
