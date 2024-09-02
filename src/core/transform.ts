import {
	getDriver,
	getVehicle,
	getPickupRoute,
} from "$backend/database/get";
import {
	DriverReportModel,
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";
import {
	OperationalLogModel,
	OperationalLogEntry,
} from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";

export const fromDriverReportModelToEntry = (
	model: DriverReportModel,
	driver: DriverModel,
) => {
	const entry: DriverReportEntry = {
		id: model.id,
		datetime: model.datetime,
		title: model.title,
		topics: model.topics
			.split(",")
			.map((topic) => topic.trim())
			.filter((topic) => topic.length > 0),
		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,
	};
	return entry;
};

export const transformVehicleModelToLogItem = (
	model: VehicleModel,
): { id: string; licensePlate: string } => {
	return {
		id: model.id,
		licensePlate: model.license_plate,
	};
};

export const transformDriverModelToLogItem = (
	model: DriverModel,
): {
	id: string;
	name: string;
	surname: string;
} => {
	return {
		id: model.id,
		name: model.name,
		surname: model.surname,
	};
};

export const transformPickupRouteModelToLogItem =
	(
		model: PickupRouteModel,
	): { id: string; name: string } => {
		return {
			id: model.id,
			name: model.name,
		};
	};

export const fromOperationalLogModelToEntry =
	async (
		model: OperationalLogModel,
	): Promise<OperationalLogEntry | null> => {
		const driver = await getDriver(
			model.driver_id,
		);
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
