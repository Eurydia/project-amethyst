import {
	getDriverAll,
	getOperationLogToday,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import {
	VehicleEntry,
	VehicleModel,
} from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	logAll: OperationalLogModel[],
	vehicle: VehicleModel,
	driverAll: DriverModel[],
	routeAll: PickupRouteModel[],
) => {
	const driverIds = new Set<string>();
	const routeIds = new Set<string>();
	for (const { driver_id, route_id } of logAll) {
		driverIds.add(driver_id);
		routeIds.add(route_id);
	}

	const entry: VehicleEntry = {
		id: vehicle.id,
		licensePlate: vehicle.license_plate,
		routes: routeAll
			.filter(({ id }) => routeIds.has(id))
			.map(({ id, name }) => ({
				id,
				name,
			})),
		drivers: driverAll
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
	vehicleAll: VehicleModel[],
	driverAll: DriverModel[],
	routeAll: PickupRouteModel[],
) => {
	const entries = [];
	for (const vehicle of vehicleAll) {
		const entry = toEntry(
			logAll,
			vehicle,
			driverAll,
			routeAll,
		);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: VehicleEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logAll = await getOperationLogToday();
		const vehicleAll = await getVehicleAll();
		const driverAll = await getDriverAll();
		const routeAll = await getPickupRouteAll();
		const entries = toEntries(
			logAll,
			vehicleAll,
			driverAll,
			routeAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
