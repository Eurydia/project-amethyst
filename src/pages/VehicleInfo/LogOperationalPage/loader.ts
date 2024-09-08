import {
	getDriverAll,
	getPickupRouteAll,
	getVehicle,
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
	vehicle: VehicleModel;
	initFormData: OperationalLogFormData;
	driverSelectOptions: DriverModel[];
	routeSelectOptions: PickupRouteModel[];
};
export const logOperationalPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.vehicleId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
			);
		}

		const vehicleId = Number.parseInt(
			params.vehicleId,
		);
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.vehicleIsMissingFromDatabase,
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
		const routeSelectOptions =
			await getPickupRouteAll();
		if (routeSelectOptions.length === 0) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
			);
		}
		const driver = driverSelectOptions[0];
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
		const loaderData: LogOperationalPageLoaderData =
			{
				vehicle,
				initFormData,
				driverSelectOptions,
				routeSelectOptions,
			};
		return loaderData;
	};
