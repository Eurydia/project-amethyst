/** @format */

import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/operational-log";

export const OPERATIONAL_LOG_MODEL_TRANSFORMER = {
	toOperationalLogEntry: async (log: OperationalLogModel) => {
		const vehicle = await tauriGetVehicle(log.vehicle_id);
		const driver = await tauriGetDriver(log.driver_id);
		const route = await tauriGetPickupRoute(log.route_id);

		if (vehicle === null || driver === null || route === null) {
			return null;
		}

		const entry: OperationalLogEntry = {
			id: log.id,
			startDate: log.start_date,
			endDate: log.end_date,

			vehicleId: vehicle.id,
			vehicleLicensePlate: vehicle.license_plate,

			driverId: driver.id,
			driverName: driver.name,
			driverSurname: driver.surname,

			routeId: route.id,
			routeName: route.name,
		};
		return entry;
	},
};
