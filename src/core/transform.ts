import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	PickupRouteEntry,
	PickupRouteModel,
} from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";

const pickupRouteToEntryItem = () => {};

export const logToPickupRouteEntry = (
	logs: OperationalLogModel[],
	route: PickupRouteModel,
	drivers: DriverModel[],
	vehicles: VehicleModel[],
) => {
	const driverIds = new Set<string>();
	const vehicleIds = new Set<string>();
	for (const { vehicle_id, driver_id } of logs) {
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
	logs: OperationalLogModel[],
	routes: PickupRouteModel[],
	drivers: DriverModel[],
	vehicles: VehicleModel[],
) => {
	const entries = [];
	for (const route of routes) {
		const entry = logToPickupRouteEntry(
			logs.filter(
				({ route_id }) => route_id === route.id,
			),
			route,
			drivers,
			vehicles,
		);
		entries.push(entry);
	}
	return entries;
};
