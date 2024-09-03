import {
	getDriverAll,
	getOperationLogToday,
	getPickupRouteMany,
	getVehicleMany,
} from "$backend/database/get";
import {
	DriverEntry,
	DriverModel,
} from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import { LoaderFunction } from "react-router-dom";

const toEntry = async (
	opLogs: OperationalLogModel[],
	driver: DriverModel,
) => {
	const logs = opLogs.filter(
		(log) => log.driver_id === driver.id,
	);
	const vehicleIds = new Set<string>();
	const routeIds = new Set<string>();
	for (const { route_id, vehicle_id } of logs) {
		vehicleIds.add(vehicle_id);
		routeIds.add(route_id);
	}

	const vehicles = await getVehicleMany(
		vehicleIds,
	);
	const routes = await getPickupRouteMany(
		routeIds,
	);

	const entry: DriverEntry = {
		id: driver.id,
		name: driver.name,
		surname: driver.surname,
		routes: routes.map(({ id, name }) => ({
			id,
			name,
		})),
		vehicles: vehicles.map(
			({ id, license_plate }) => ({
				id,
				licensePlate: license_plate,
			}),
		),
	};
	return entry;
};

const toEntries = async (
	logs: OperationalLogModel[],
	drivers: DriverModel[],
) => {
	const entries = [];
	for (const driver of drivers) {
		const entry = toEntry(
			logs.filter(
				({ driver_id }) =>
					driver_id === driver.id,
			),
			driver,
		);
		entries.push(entry);
	}
	return Promise.all(entries);
};

export type IndexPageLoaderData = {
	entries: DriverEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logs = await getOperationLogToday();
		const drivers = await getDriverAll();
		const entries = await toEntries(
			logs,
			drivers,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
