import {
	getDriverMany,
	getOperationLogAll,
	getPickupRouteMany,
	getVehicleAll,
} from "$backend/database/get";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	VehicleEntry,
	VehicleModel,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

const toEntry = async (
	logs: OperationalLogModel[],
	vehicle: VehicleModel,
) => {
	const driverIds = new Set<string>();
	const routeIds = new Set<string>();
	for (const { driver_id, route_id } of logs) {
		driverIds.add(driver_id);
		routeIds.add(route_id);
	}

	const drivers = await getDriverMany(driverIds);
	const routes = await getPickupRouteMany(
		routeIds,
	);

	const entry: VehicleEntry = {
		id: vehicle.id,
		licensePlate: vehicle.license_plate,
		routes: routes.map(({ id, name }) => ({
			id,
			name,
		})),
		drivers: drivers.map(
			({ id, name, surname }) => ({
				id,
				name,
				surname,
			}),
		),
	};
	return entry;
};

const toEntries = async (
	logs: OperationalLogModel[],
	vehicles: VehicleModel[],
) => {
	const entries = [];
	for (const vehicle of vehicles) {
		const entry = toEntry(
			logs.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicle.id,
			),
			vehicle,
		);
		entries.push(entry);
	}
	return Promise.all(entries);
};

const getLogs = async () => {
	const today = dayjs();
	const opLogs = await getOperationLogAll();
	return opLogs
		.filter(
			({ start_date }) =>
				start_date === null ||
				today.isAfter(dayjs(start_date)),
		)
		.filter(
			({ end_date }) =>
				end_date === null ||
				today.isBefore(dayjs(end_date)),
		);
};

export type IndexPageLoaderData = {
	entries: VehicleEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const logs = await getLogs();
		const vehicles = await getVehicleAll();
		const entries = await toEntries(
			logs,
			vehicles,
		);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
