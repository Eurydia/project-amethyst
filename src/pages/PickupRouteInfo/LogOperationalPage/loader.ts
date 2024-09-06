import {
	getDriverAll,
	getPickupRoute,
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
	initFormData: OperationalLogFormData;
	route: PickupRouteModel;
	vehicleSelectOptions: VehicleModel[];
	driverSelectOptions: DriverModel[];
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

		const route = await getPickupRoute(
			Number.parseInt(routeId),
		);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const driverSelectOptions =
			await getDriverAll();
		if (driverSelectOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoDriverInDatabase,
				},
				{ status: 400 },
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
				{ status: 400 },
			);
		}

		const initFormData: OperationalLogFormData = {
			startDate: dayjs()
				.startOf("month")
				.format(),
			endDate: dayjs().endOf("month").format(),

			driver: driverSelectOptions[0],
			vehicle: vehicleSelectOptions[0],
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
