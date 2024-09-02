import {
	getTopicAll,
	getVehicle,
} from "$backend/database/get";
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
	vehicleOptions: VehicleModel[];
	topicOptions: string[];
	initFormData: VehicleReportGeneralFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{ message: "ข้อมูลคนขับรถไม่ถูกต้อง" },
				{ status: 400 },
			);
		}
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{ message: "ไม่พบข้อมูลคน" },
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
				vehicleOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
