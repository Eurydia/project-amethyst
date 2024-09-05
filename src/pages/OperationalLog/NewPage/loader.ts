import {
	getDriver,
	getPickupRoute,
	getPickupRouteAll,
	getVehicle,
} from "$backend/database/get";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: OperationalLogFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const driver = await getDriver(1);
		const vehicle = await getVehicle(1);
		const route = await getPickupRoute(1);

		if (
			driver === null ||
			vehicle === null ||
			route === null
		) {
			throw json(
				{
					message: "ไม่พบข้อมูล",
				},
				{
					status: 400,
				},
			);
		}

		await getPickupRouteAll();
		const initFormData: OperationalLogFormData = {
			startDate: dayjs()
				.startOf("month")
				.format(),
			endDate: dayjs().endOf("month").format(),
			driver,
			route,
			vehicle,
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
