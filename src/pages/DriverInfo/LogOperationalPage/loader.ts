import {
	getDriver,
	getDriverAll,
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
	driverId: number;
	initFormData: OperationalLogFormData;
	vehicleOptions: VehicleModel[];
	driverOptions: DriverModel[];
	routeOptions: PickupRouteModel[];
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
		const driverOptions = await getDriverAll();
		const vehicleOptions = await getVehicleAll();
		const routeOptions =
			await getPickupRouteAll();

		if (routeOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
				{ status: 404 },
			);
		}
		if (vehicleOptions.length === 0) {
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
			route: routeOptions[0],
			vehicle: vehicleOptions[0],
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				driverId,
				initFormData,
				driverOptions,
				vehicleOptions,
				routeOptions,
			};
		return loaderData;
	};
