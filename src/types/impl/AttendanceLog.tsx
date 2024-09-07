import {
	getDriver,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import {
	AttendanceLogEntry,
	AttendanceLogModel,
} from "$types/models/AttendanceLog";

export const AttendanceLogModelImpl = {
	toEntry: async (log: AttendanceLogModel) => {
		const driver = await getDriver(log.driver_id);
		if (driver === null) {
			return null;
		}
		const vehicle = await getVehicle(
			log.vehicle_id,
		);
		if (vehicle === null) {
			return null;
		}
		const route = await getPickupRoute(
			log.route_id,
		);
		if (route === null) {
			return null;
		}

		const entry: AttendanceLogEntry = {
			id: log.id,

			expectedArrivalDatetime:
				log.expected_arrival_datetime,
			expectedDepartureDatetime:
				log.expected_departure_datetime,

			actualArrivalDatetime:
				log.actual_arrival_datetime,
			actualDepartureDatetime:
				log.actual_departure_datetime,

			driverId: log.driver_id,
			driverName: driver.name,
			driverSurname: driver.surname,

			vehicleId: log.vehicle_id,
			vehicleLicensePlate: vehicle.license_plate,

			routeId: log.route_id,
			routeName: route.name,
		};

		return entry;
	},
};
