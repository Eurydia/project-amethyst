import {
	getDriverAll,
	getPickupRouteAll,
	getVehicle,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { VehicleModel } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type LogOperationalPageLoaderData = {
	vehicleId: string;
	initFormData: OperationalLogFormData;
	vehicleOptions: VehicleModel[];
	driverOptions: DriverModel[];
	routeOptions: PickupRouteModel[];
};
export const logOperationalPageLoader: LoaderFunction =
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
		const vehicleOptions = await getVehicleAll();
		const driverOptions = await getDriverAll();
		const routeOptions =
			await getPickupRouteAll();
		const initFormData: OperationalLogFormData = {
			startDate: "",
			endDate: "",

			driver: null,
			route: null,
			vehicle,
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				vehicleId,
				initFormData,
				driverOptions,
				vehicleOptions,
				routeOptions,
			};
		return loaderData;
	};
