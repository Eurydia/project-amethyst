import {
	getDriver,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type LogOperationalPageLoaderData = {
	driver: DriverModel;
	initFormData: OperationalLogFormData;
	vehicleSelectOptions: VehicleModel[];
	routeSelectOptions: PickupRouteModel[];
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
		const routeSelectOptions =
			await getPickupRouteAll();
		if (routeSelectOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
				{ status: 404 },
			);
		}
		const vehicleSelectOptions =
			await getVehicleAll();
		if (vehicleSelectOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoVehicleInDatabase,
				},
				{ status: 404 },
			);
		}

		const vehicle = vehicleSelectOptions[0];
		const route = routeSelectOptions[0];

		const initFormData: OperationalLogFormData = {
			startDate: dayjs().format(),
			endDate: dayjs().format(),

			driver,
			route,
			vehicle,
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				driver,
				initFormData,
				routeSelectOptions,
				vehicleSelectOptions,
			};
		return loaderData;
	};
