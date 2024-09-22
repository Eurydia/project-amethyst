/** @format */

import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetOperationLogToday } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { VehicleEntry, VehicleModel } from "$types/models/vehicle";

export const VEHICLE_MODEL_TRANSFORMER = {
	toVehicleEntry: async (vehicle: VehicleModel) => {
		const logs = await tauriGetOperationLogToday();

		const driverIds = new Set<number>();
		const routeIds = new Set<number>();
		for (const log of logs) {
			if (log.vehicle_id !== vehicle.id) {
				continue;
			}
			driverIds.add(log.driver_id);
			routeIds.add(log.route_id);
		}

		const drivers = (await Promise.all([...driverIds].map(tauriGetDriver)))
			.filter((driver) => driver !== null)
			.map(({ id, name, surname }) => ({
				id,
				name,
				surname,
			}));
		const routes = (await Promise.all([...routeIds].map(tauriGetPickupRoute)))
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
