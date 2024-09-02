import {
	getTopicAll,
	getVehicleAll,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	vehicleOptions: VehicleModel[];
	topicOptions: string[];
	initFormData: VehicleReportInspectionFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const topicOptions = await getTopicAll();
		const vehicleOptions = await getVehicleAll();

		const initFormData: VehicleReportInspectionFormData =
			{
				datetime: dayjs().format(),
				vehicle: null,
				frame: "",
				windows: "",
				frontCamera: "",
				content: "",
				overheadFan: "",
				brakeLights: "",
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
			topicOptions,
			vehicleOptions,
		};

		return loaderData;
	};
