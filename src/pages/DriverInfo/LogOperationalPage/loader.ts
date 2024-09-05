import {
	getDriver,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type LogOperationalPageLoaderData = {
	driverId: number;
	initFormData: OperationalLogFormData;
};
export const logOperationalPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.driverId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const driverId = Number.parseInt(
			params.driverId,
		);
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.driverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const route = await getPickupRoute(1);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
				{ status: 404 },
			);
		}
		const vehicle = await getVehicle(1);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.errorNoVehicleInDatabase,
				},
				{ status: 404 },
			);
		}
		const initFormData: OperationalLogFormData = {
			startDate: dayjs().format(),
			endDate: dayjs().format(),

			driver,
			route,
			vehicle,
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				driverId,
				initFormData,
			};
		return loaderData;
	};
