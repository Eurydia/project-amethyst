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
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: OperationalLogFormData;
	driverSelectOptions: DriverModel[];
	vehicleSelectOptions: VehicleModel[];
	routeSelectOptions: PickupRouteModel[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const driverSelectOptions =
			await getDriverAll();
		if (driverSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 404,
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
					status: 404,
					statusText:
						TRANSLATION.errorNoVehicleInDatabase,
				},
			);
		}
		const routeSelectOptions =
			await getPickupRouteAll();
		if (routeSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
			);
		}
		const driver = driverSelectOptions[0];
		const vehicle = vehicleSelectOptions[0];
		const route = routeSelectOptions[0];

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
			driverSelectOptions,
			vehicleSelectOptions,
			routeSelectOptions,
		};
		return loaderData;
	};
