import {
	getDriverAll,
	getPickupRoute,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/driver";
import { OperationalLogFormData } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type LogOperationalPageLoaderData = {
	initFormData: OperationalLogFormData;
	route: PickupRouteModel;
	vehicleSelectOptions: VehicleModel[];
	driverSelectOptions: DriverModel[];
};
export const logOperationalPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.routeId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
			);
		}
		const routeId = Number.parseInt(
			params.routeId,
		);
		const route = await getPickupRoute(routeId);
		if (route === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
			);
		}

		const driverSelectOptions =
			await getDriverAll();
		if (driverSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.errorNoDriverInDatabase,
				},
			);
		}
		const vehicleSelectOptions =
			await getVehicleAll();

		if (vehicleSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.errorNoVehicleInDatabase,
				},
			);
		}
		const driver = driverSelectOptions[0];
		const vehicle = vehicleSelectOptions[0];

		const initFormData: OperationalLogFormData = {
			startDate: dayjs()
				.startOf("month")
				.format(),
			endDate: dayjs().endOf("month").format(),

			driver,
			vehicle,
			route,
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				route,
				initFormData,
				driverSelectOptions,
				vehicleSelectOptions,
			};
		return loaderData;
	};
