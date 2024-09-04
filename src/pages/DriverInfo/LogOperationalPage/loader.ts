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
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type LogOperationalPageLoaderData = {
	driverId: string;
	initFormData: OperationalLogFormData;
	vehicleOptions: VehicleModel[];
	driverOptions: DriverModel[];
	routeOptions: PickupRouteModel[];
};
export const logOperationalPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}

		const driver = await getDriver(
			Number.parseInt(driverId),
		);
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
		const initFormData: OperationalLogFormData = {
			startDate: "",
			endDate: "",

			driver,
			route: null,
			vehicle: null,
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
