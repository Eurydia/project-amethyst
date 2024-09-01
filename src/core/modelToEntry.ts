import {
	getDriver,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";

export const operationalLogModelToEntry = async (
	model: OperationalLogModel,
): Promise<OperationalLogEntry | null> => {
	const driver = await getDriver(model.driver_id);
	if (driver === null) {
		return null;
	}
	const vehicle = await getVehicle(
		model.vehicle_id,
	);
	if (vehicle === null) {
		return null;
	}
	const route = await getPickupRoute(
		model.route_id,
	);
	if (route === null) {
		return null;
	}
	const entry: OperationalLogEntry = {
		id: model.id,
		startDate: model.start_date,
		endDate: model.end_date,

		routeId: model.route_id,
		routeName: route.name,

		vehicleId: model.vehicle_id,
		vehicleLicensePlate: vehicle.license_plate,

		driverId: model.driver_id,
		driverName: driver.name,
		driverSurname: driver.surname,
	};
	return entry;
};
