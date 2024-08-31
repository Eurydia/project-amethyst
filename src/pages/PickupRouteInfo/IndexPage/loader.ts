import {
	getDriverWithId,
	getOperationLogWithRouteId,
	getPickupRouteReportGeneralAllWithRouteId,
	getPickupRouteWithId,
	getVehicleWithId,
} from "$backend/database/get";
import {
	OperationalLog,
	PickupRouteReport,
} from "$types/models";
import { PickupRouteModel } from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type IndexPageLoaderData = {
	route: PickupRouteModel;
	generalReportEntries: PickupRouteReport[];
	operationalLogEntries: OperationalLog[];
};

export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}

		const route = await getPickupRouteWithId(
			routeId,
		);

		if (route === null) {
			throw json(
				{ message: "Not found" },
				{ status: 404 },
			);
		}
		const generalReportEntries = (
			await getPickupRouteReportGeneralAllWithRouteId(
				route.id,
			)
		).map(
			(rawEntry) =>
				({
					content: rawEntry.content,
					datetime: rawEntry.datetime,
					id: rawEntry.id,
					title: rawEntry.title,
					topics: rawEntry.topics.split(","),
					routeId: rawEntry.route_id,
					routeName: route.name,
				} as PickupRouteReport),
		);

		const logs = await getOperationLogWithRouteId(
			route.id,
		);
		const logRequests = logs.map(
			async (rawEntry) => {
				const driver = await getDriverWithId(
					rawEntry.driver_id,
				);
				if (driver === null) {
					return null;
				}

				const vehicle = await getVehicleWithId(
					rawEntry.vehicle_id,
				);

				if (vehicle === null) {
					return null;
				}
				return {
					endDate: rawEntry.start_date,
					startDate: rawEntry.start_date,
					id: rawEntry.id,
					driverId: rawEntry.driver_id,
					driverName: driver.name,
					driverSurname: driver.surname,
					routeId: rawEntry.route_id,
					routeName: route.name,
					vehicleId: rawEntry.vehicle_id,
					vehiclePlate: vehicle.license_plate,
				} as OperationalLog;
			},
		);

		const operationalLogEntries = (
			await Promise.all(logRequests)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			route: route,
			operationalLogEntries,
			generalReportEntries,
		};

		return loaderData;
	};
