import {
	getDriverMany,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleMany,
} from "$backend/database/get";
import {
	transformDriverModelToLogItem,
	transformPickupRouteModelToLogItem,
	transformVehicleModelToLogItem,
} from "$core/transform";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

const getLogEntries = async (
	logModels: OperationalLogModel[],
	routeModel: PickupRouteModel,
) => {
	const driverIds = new Set<string>();
	const vehicleIds = new Set<string>();
	for (const log of logModels) {
		if (log.route_id === routeModel.id) {
			driverIds.add(log.driver_id);
			vehicleIds.add(log.route_id);
		}
	}
	const route =
		transformPickupRouteModelToLogItem(
			routeModel,
		);
	const vehicles = (
		await getVehicleMany(vehicleIds)
	).map(transformVehicleModelToLogItem);
	const drivers = (
		await getDriverMany(driverIds)
	).map(transformDriverModelToLogItem);
	return {
		vehicles,
		drivers,
		route,
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
			await getPickupRouteAll()
		).map((routeModel) =>
			getLogEntries(logModels, routeModel),
		);
		const entries = await Promise.all(
			entryRequests,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
