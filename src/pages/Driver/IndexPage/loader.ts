import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteMany,
	getVehicleMany,
} from "$backend/database/get";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: {
		id: string;
		name: string;
		surname: string;

		vehicles: {
			id: string;
			licensePlate: string;
		}[];

		routes: {
			id: string;
			name: string;
		}[];
	}[];
};

const getOpLogEntries = async (
	opLogs: OperationalLogModel[],
	driver: DriverModel,
) => {
	const vehicleIds = new Set<string>();
	const routeIds = new Set<string>();

	for (const log of opLogs) {
		if (log.driver_id === driver.id) {
			vehicleIds.add(log.vehicle_id);
			routeIds.add(log.route_id);
		}
	}

	const vehicles = (
		await getVehicleMany(vehicleIds)
	).map(
		(vehicle) =>
			({
				id: vehicle.id,
				licensePlate: vehicle.license_plate,
			} as IndexPageLoaderData["entries"][number]["vehicles"][number]),
	);

	const routes = (
		await getPickupRouteMany(routeIds)
	).map(
		(route) =>
			({
				id: route.id,
				name: route.name,
			} as IndexPageLoaderData["entries"][number]["routes"][number]),
	);

	return {
		id: driver.id,
		name: driver.name,
		surname: driver.surname,
		contact: driver.contact,
		vehicles,
		routes,
	};
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const today = dayjs();
		const opLogs = (await getOperationLogAll())
			.filter(
				(log) =>
					log.start_date === null ||
					dayjs(log.start_date).isBefore(today),
			)
			.filter(
				(log) =>
					log.end_date === null ||
					dayjs(log.end_date).isAfter(today),
			);

		const entryRequests = (
			await getDriverAll()
		).map((driverModel) =>
			getOpLogEntries(opLogs, driverModel),
		);

		const entries = await Promise.all(
			entryRequests,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
