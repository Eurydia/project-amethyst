import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import {
	DriverEntry,
	DriverModel,
} from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

const resolveVehicles = async (
	vehicleIds: Set<string>,
) => {
	const vehicles = await getVehicleAll();
	const collected: {
		id: string;
		licensePlate: string;
	}[] = [];

	for (const vehicle of vehicles) {
		if (!vehicleIds.has(vehicle.id)) {
			continue;
		}
		const entry = {
			id: vehicle.id,
			licensePlate: vehicle.license_plate,
		};
		collected.push(entry);
	}
	return collected;
};

const resolveRoutes = async (
	routeIds: Set<string>,
) => {
	const routes = await getPickupRouteAll();
	const collected: {
		id: string;
		name: string;
	}[] = [];
	for (const route of routes) {
		if (!routeIds.has(route.id)) {
			continue;
		}
		const entry = {
			id: route.id,
			name: route.name,
		};
		collected.push(entry);
	}
	return collected;
};

const toEntry = async (
	opLogs: OperationalLogModel[],
	driver: DriverModel,
) => {
	const logs = opLogs.filter(
		(log) => log.driver_id === driver.id,
	);
	const vehicleSet = new Set<string>();
	const routeSet = new Set<string>();
	for (const log of logs) {
		vehicleSet.add(log.vehicle_id);
		routeSet.add(log.route_id);
	}

	const vehicles = await resolveVehicles(
		vehicleSet,
	);
	const routes = await resolveRoutes(routeSet);

	const entry: DriverEntry = {
		id: driver.id,
		name: driver.name,
		surname: driver.surname,
		routes,
		vehicles,
	};
	return entry;
};

const getLogs = async () => {
	const today = dayjs();
	const opLogs = await getOperationLogAll();
	return opLogs
		.filter(
			({ start_date }) =>
				start_date === null ||
				today.isAfter(dayjs(start_date)),
		)
		.filter(
			({ end_date }) =>
				end_date === null ||
				today.isBefore(dayjs(end_date)),
		);
};

export type IndexPageLoaderData = {
	entries: DriverEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		// Collect relevant log entries
		const logs = await getLogs();
		const drivers = await getDriverAll();

		const entries: DriverEntry[] = [];
		for (const driver of drivers) {
			const entry = await toEntry(logs, driver);
			entries.push(entry);
		}

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
