import {
	getDriver,
	getOperationLogToday,
	getPickupRouteAll,
	getVehicle,
} from "$backend/database/get";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	PickupRouteEntry,
	PickupRouteModel,
} from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

const toEntry = async (
	logs: OperationalLogModel[],
	route: PickupRouteModel,
) => {
	const driverIds = new Set<number>();
	const vehicleIds = new Set<number>();
	for (const log of logs) {
		driverIds.add(log.driver_id);
		vehicleIds.add(log.vehicle_id);
	}

	const driverRequests = [...driverIds].map(
		(id) => getDriver(id),
	);
	const vehicleRequests = [...vehicleIds].map(
		(id) => getVehicle(id),
	);
	const drivers = await Promise.all(
		driverRequests,
	);
	const vehicles = await Promise.all(
		vehicleRequests,
	);

	const entry: PickupRouteEntry = {
		id: route.id,
		name: route.name,
		drivers: drivers
			.filter((driver) => driver !== null)
			.map(({ id, name, surname }) => ({
				id,
				name,
				surname,
			})),
		vehicles: vehicles
			.filter((vehicle) => vehicle !== null)
			.map(({ id, license_plate }) => ({
				id,
				licensePlate: license_plate,
			})),
	};
	return entry;
};

export type IndexPageLoaderData = {
	entries: PickupRouteEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logAll = await getOperationLogToday();
		const routeAll = await getPickupRouteAll();

		const entryPromise = [];
		for (const route of routeAll) {
			const logs = logAll.filter(
				({ route_id }) => route_id === route.id,
			);
			const entry = toEntry(logs, route);
			entryPromise.push(entry);
		}

		const entries = await Promise.all(
			entryPromise,
		);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
