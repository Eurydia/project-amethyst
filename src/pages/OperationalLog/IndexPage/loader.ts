import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models/Driver";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	log: OperationalLogModel,
	driver: DriverModel,
	vehicle: VehicleModel,
	route: PickupRouteModel,
) => {
	const entry: OperationalLogEntry = {
		id: log.id,
		startDate: log.start_date,
		endDate: log.end_date,

		driverId: log.driver_id,
		driverName: driver.name,
		driverSurname: driver.surname,

		routeId: log.route_id,
		routeName: route.name,

		vehicleId: log.vehicle_id,
		vehicleLicensePlate: vehicle.license_plate,
	};
	return entry;
};

const toEntries = (
	logAll: OperationalLogModel[],
	driverAll: DriverModel[],
	vehicleAll: VehicleModel[],
	routeAll: PickupRouteModel[],
) => {
	const entries = [];
	for (const log of logAll) {
		const driver = driverAll.find(
			({ id }) => log.driver_id === id,
		);
		if (driver === undefined) {
			continue;
		}
		const vehicle = vehicleAll.find(
			({ id }) => log.vehicle_id === id,
		);
		if (vehicle === undefined) {
			continue;
		}
		const route = routeAll.find(
			({ id }) => log.route_id === id,
		);
		if (route === undefined) {
			continue;
		}
		const entry = toEntry(
			log,
			driver,
			vehicle,
			route,
		);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: OperationalLogEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logAll = await getOperationLogAll();
		const driverAll = await getDriverAll();
		const vehicleAll = await getVehicleAll();
		const routeAll = await getPickupRouteAll();
		const entries = toEntries(
			logAll,
			driverAll,
			vehicleAll,
			routeAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
