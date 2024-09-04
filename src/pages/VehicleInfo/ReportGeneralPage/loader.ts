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
	vehicleId: string;
	vehicleOptions: VehicleModel[];
	topicOptions: string[];
	initFormData: VehicleReportGeneralFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
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
		const vehicle = await getVehicle(
			Number.parseInt(vehicleId),
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
		const topicOptions = await getTopicAll();
		const vehicleOptions = [vehicle];
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
				vehicleId,
				vehicleOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
