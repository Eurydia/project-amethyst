import {
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
	routeId: string;
	initFormData: OperationalLogFormData;
	vehicleOptions: VehicleModel[];
	driverOptions: DriverModel[];
	routeOptions: PickupRouteModel[];
};
export const logOperationalPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}

		const routeOptions =
			await getPickupRouteAll();

		const route = routeOptions.find(
			({ id }) => id === routeId,
		);
		if (route === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const driverOptions = await getDriverAll();
		const vehicleOptions = await getVehicleAll();
		const initFormData: OperationalLogFormData = {
			startDate: "",
			endDate: "",

			driver: null,
			route,
			vehicle: null,
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				routeId,
				initFormData,
				driverOptions,
				vehicleOptions,
				routeOptions,
			};
		return loaderData;
	};
