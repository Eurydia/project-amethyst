import {
	getDriverAll,
	getOperationLogToday,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	PickupRouteEntry,
	PickupRouteModel,
} from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	logs: OperationalLogModel[],
	route: PickupRouteModel,
	drivers: DriverModel[],
	vehicles: VehicleModel[],
) => {
	const driverIds = new Set<string>();
	const vehicleIds = new Set<string>();
	for (const {
		route_id,
		vehicle_id,
		driver_id,
	} of logs) {
		if (route_id !== route.id) {
			continue;
		}
		driverIds.add(driver_id);
		vehicleIds.add(vehicle_id);
	}

	const entry: PickupRouteEntry = {
		id: route.id,
		name: route.name,
		vehicles: vehicles
			.filter(({ id }) => vehicleIds.has(id))
			.map(({ id, license_plate }) => ({
				id,
				licensePlate: license_plate,
			})),
		drivers: drivers
			.filter(({ id }) => driverIds.has(id))
			.map(({ id, name, surname }) => ({
				id,
				name,
				surname,
			})),
	};
	return entry;
};

const toEntries = (
	logAll: OperationalLogModel[],
	routeAll: PickupRouteModel[],
	driverAll: DriverModel[],
	vehicleAll: VehicleModel[],
) => {
	const entries = [];
	for (const route of routeAll) {
		const entry = toEntry(
			logAll,
			route,
			driverAll,
			vehicleAll,
		);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: PickupRouteEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logAll = await getOperationLogToday();
		const routeAll = await getPickupRouteAll();
		const driverAll = await getDriverAll();
		const vehicleAll = await getVehicleAll();
		const entries = toEntries(
			logAll,
			routeAll,
			driverAll,
			vehicleAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
