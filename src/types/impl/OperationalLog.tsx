import {
	getDriver,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";

export const OperationalLogModelImpl = {
	toEntry: async (log: OperationalLogModel) => {
		const vehicle = await getVehicle(
			log.vehicle_id,
		);
		const driver = await getDriver(log.driver_id);
		const route = await getPickupRoute(
			log.route_id,
		);

		if (!vehicle || !driver || !route) {
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
