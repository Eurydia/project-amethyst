import {
	DriverReportModel,
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";

export const transformDriverReportModelToEntry = (
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
