import {
	getDriverMany,
	getOperationLogToday,
	getPickupRouteAll,
	getVehicleMany,
} from "$backend/database/get";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	PickupRouteEntry,
	PickupRouteModel,
} from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

const toEntry = async (
	logs: OperationalLogModel[],
	route: PickupRouteModel,
) => {
	const driverIds = new Set<string>();
	const vehicleIds = new Set<string>();
	for (const { vehicle_id, driver_id } of logs) {
		driverIds.add(driver_id);
		vehicleIds.add(vehicle_id);
	}

	const drivers = await getDriverMany(driverIds);
	const vehicles = await getVehicleMany(
		vehicleIds,
	);
	const entry: PickupRouteEntry = {
		id: route.id,
		name: route.name,
		vehicles: vehicles.map(
			({ id, license_plate }) => ({
				id,
				licensePlate: license_plate,
			}),
		),
		drivers: drivers.map(
			({ id, name, surname }) => ({
				id,
				name,
				surname,
			}),
		),
	};
	return entry;
};

const toEntries = async (
	logs: OperationalLogModel[],
	routes: PickupRouteModel[],
) => {
	const entries = [];
	for (const route of routes) {
		const entry = toEntry(
			logs.filter(
				({ route_id }) => route_id === route.id,
			),
			route,
		);
		entries.push(entry);
	}
	return Promise.all(entries);
};

export type IndexPageLoaderData = {
	entries: PickupRouteEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logs = await getOperationLogToday();
		const routes = await getPickupRouteAll();
		const entries = await toEntries(logs, routes);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
