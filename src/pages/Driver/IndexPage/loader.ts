import {
	getDriverAll,
	getOperationLogToday,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import {
	DriverEntry,
	DriverModel,
} from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	logAll: OperationalLogModel[],
	driver: DriverModel,
	vehicleAll: VehicleModel[],
	routeAll: PickupRouteModel[],
) => {
	const vehicleIds = new Set<string>();
	const routeIds = new Set<string>();
	for (const {
		route_id,
		vehicle_id,
		driver_id,
	} of logAll) {
		if (driver_id !== driver.id) {
			continue;
		}
		vehicleIds.add(vehicle_id);
		routeIds.add(route_id);
	}

	const entry: DriverEntry = {
		id: driver.id,
		name: driver.name,
		surname: driver.surname,
		routes: routeAll
			.filter(({ id }) => routeIds.has(id))
			.map(({ id, name }) => ({
				id,
				name,
			})),
		vehicles: vehicleAll
			.filter(({ id }) => vehicleIds.has(id))
			.map(({ id, license_plate }) => ({
				id,
				licensePlate: license_plate,
			})),
	};
	return entry;
};

const toEntries = (
	logAll: OperationalLogModel[],
	driverAll: DriverModel[],
	vehicleAll: VehicleModel[],
	routeAll: PickupRouteModel[],
) => {
	const entries = [];
	for (const driver of driverAll) {
		const entry = toEntry(
			logAll,
			driver,
			vehicleAll,
			routeAll,
		);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: DriverEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logAll = await getOperationLogToday();
		const driverAll = await getDriverAll();
		const vehicleAll = await getVehicleAll();
		const routeAll = await getPickupRouteAll();
		const entries = toEntries(
			logAll,
			driverAll,
			vehicleAll,
			routeAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
