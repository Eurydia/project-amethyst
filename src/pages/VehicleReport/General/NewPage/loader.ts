import {
	getTopicAll,
	getVehicleAll,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportGeneralFormData,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	vehicleOptions: VehicleModel[];
	topicOptions: string[];
	initFormData: VehicleReportGeneralFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const topicOptions = await getTopicAll();
		const vehicleOptions = await getVehicleAll();

		const initFormData: VehicleReportGeneralFormData =
			{
				vehicle: null,
				datetime: dayjs().format(),
				content: "",
				title: "",
				topics: [],
			};

		const loaderData: NewPageLoaderData = {
			initFormData,
			topicOptions,
			vehicleOptions,
		};

		return loaderData;
	};
