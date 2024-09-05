import {
	getDriver,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type LogOperationalPageLoaderData = {
	initFormData: OperationalLogFormData;
	route: PickupRouteModel;
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

		const driver = await getDriver(1);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.errorNoDriverInDatabase,
				},
				{ status: 400 },
			);
		}
		const vehicle = await getVehicle(1);
		if (vehicle === null) {
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

			driver,
			vehicle,
			route,
		};
		const loaderData: LogOperationalPageLoaderData =
			{
				route,
				initFormData,
			};
		return loaderData;
	};
