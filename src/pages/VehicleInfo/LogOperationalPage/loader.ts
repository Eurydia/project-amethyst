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
				{
					message:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}

		const vehicleId = Number.parseInt(
			params.vehicleId,
		);
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
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
		const routeSelectOptions =
			await getPickupRouteAll();
		if (routeSelectOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoPickupRouteInDatabase,
				},
				{ status: 400 },
			);
		}
		const driver = driverSelectOptions[0];
		const route = routeSelectOptions[0];

		const initFormData: OperationalLogFormData = {
			startDate: "",
			endDate: "",

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
