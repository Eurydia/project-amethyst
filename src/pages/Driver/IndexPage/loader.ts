import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteMany,
	getVehicleMany,
} from "$backend/database/get";
import {
	transformDriverModelToLogItem,
	transformPickupRouteModelToLogItem,
	transformVehicleModelToLogItem,
} from "$core/transform";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

const getLogEntries = async (
	logModels: OperationalLogModel[],
	driverModel: DriverModel,
) => {
	const vehicleIds = new Set<string>();
	const routeIds = new Set<string>();
	for (const log of logModels) {
		if (log.driver_id === driverModel.id) {
			vehicleIds.add(log.vehicle_id);
			routeIds.add(log.route_id);
		}
	}
	const driver =
		transformDriverModelToLogItem(driverModel);
	const vehicles = (
		await getVehicleMany(vehicleIds)
	).map(transformVehicleModelToLogItem);
	const routes = (
		await getPickupRouteMany(routeIds)
	).map(transformPickupRouteModelToLogItem);
	return {
		driver,
		vehicles,
		routes,
	};
};

export type IndexPageLoaderData = {
	entries: Awaited<
		ReturnType<typeof getLogEntries>
	>[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const today = dayjs();
		const logModels = (await getOperationLogAll())
			.filter(
				(log) =>
					log.start_date === null ||
					dayjs(log.start_date).isBefore(today),
			)
			.filter(
				(log) =>
					log.end_date === null ||
					dayjs(log.end_date).isAfter(today),
			);
		const entryRequests = (
			await getDriverAll()
		).map((driverModel) =>
			getLogEntries(logModels, driverModel),
		);
		const entries = await Promise.all(
			entryRequests,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
