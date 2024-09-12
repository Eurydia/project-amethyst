import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	disableAddButton: boolean;
	logEntries: OperationalLogEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const drivers = await getDriverAll();
		const vehicles = await getVehicleAll();
		const routes = await getPickupRouteAll();

		const disableAddButton =
			drivers.length === 0 ||
			vehicles.length === 0 ||
			routes.length === 0;

		const logs = (await getOperationLogAll()).map(
			OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
		);
		const logEntries = (
			await Promise.all(logs)
		).filter((log) => log !== null);

		const loaderData: IndexPageLoaderData = {
			disableAddButton,
			logEntries,
		};
		return loaderData;
	};
