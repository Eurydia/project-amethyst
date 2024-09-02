import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	VehicleEntry,
	VehicleModel,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

const resolveDrivers = async (
	driverIds: Set<string>,
) => {
	const drivers = await getDriverAll();
	const collected: {
		id: string;
		name: string;
		surname: string;
	}[] = [];
	for (const driver of drivers) {
		if (!driverIds.has(driver.id)) {
			continue;
		}
		const entry = {
			id: driver.id,
			name: driver.name,
			surname: driver.surname,
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
	logs: OperationalLogModel[],
	vehicle: VehicleModel,
) => {
	const driverSet = new Set<string>();
	const routeSet = new Set<string>();
	for (const log of logs) {
		driverSet.add(log.driver_id);
		routeSet.add(log.route_id);
	}

	const drivers = await resolveDrivers(driverSet);
	const routes = await resolveRoutes(routeSet);

	const entry: VehicleEntry = {
		id: vehicle.id,
		licensePlate: vehicle.license_plate,
		routes,
		drivers,
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
	entries: VehicleEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const opLogs = await getLogs();

		const vehicles = await getVehicleAll();
		const entries: VehicleEntry[] = [];
		for (const vehicle of vehicles) {
			const logs = opLogs.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicle.id,
			);
			const entry = await toEntry(logs, vehicle);
			entries.push(entry);
		}

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
