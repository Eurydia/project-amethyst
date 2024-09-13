import {
	getDriver,
	getOperationLogToday,
	getPickupRoute,
} from "$backend/database/get";
import {
	VehicleEntry,
	VehicleModel,
} from "$types/models/vehicle";

export const VEHICLE_MODEL_TRANSFORMER = {
	toVehicleEntry: async (
		vehicle: VehicleModel,
	) => {
		const logs = await getOperationLogToday();

		const driverIds = new Set<number>();
		const routeIds = new Set<number>();
		for (const log of logs) {
			if (log.vehicle_id !== vehicle.id) {
				continue;
			}
			driverIds.add(log.driver_id);
			routeIds.add(log.route_id);
		}

		const drivers = (
			await Promise.all(
				[...driverIds].map(getDriver),
			)
		)
			.filter((driver) => driver !== null)
			.map(({ id, name, surname }) => ({
				id,
				name,
				surname,
			}));
		const routes = (
			await Promise.all(
				[...routeIds].map(getPickupRoute),
			)
		)
			.filter((route) => route !== null)
			.map(({ id, name }) => ({
				id,
				name,
			}));

		const entry: VehicleEntry = {
			id: vehicle.id,
			licensePlate: vehicle.license_plate,
			routes,
			drivers,
		};
		return entry;
	},
};
