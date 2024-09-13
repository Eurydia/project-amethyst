import {
	getOperationLogAll,
	getPickupRoute,
	getPickupRouteReportGeneralAll,
} from "$backend/database/get";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general-model";
import { TRANSLATION } from "$locale/th";
import { OperationalLogEntry } from "$types/models/operational-log";
import {
	PickupRouteModel,
	PickupRouteReportEntry,
} from "$types/models/pickup-route";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type IndexPageLoaderData = {
	route: PickupRouteModel;

	logEntries: OperationalLogEntry[];
	reportEntries: PickupRouteReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.routeId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
			);
		}
		const routeId = Number.parseInt(
			params.routeId,
		);
		const route = await getPickupRoute(routeId);
		if (route === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
			);
		}

		const logs = (await getOperationLogAll())
			.filter(
				({ route_id }) => route_id === route.id,
			)
			.map(
				OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
			);
		const reports = (
			await getPickupRouteReportGeneralAll()
		)
			.filter(
				({ route_id }) => route_id === route.id,
			)
			.map(
				PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toPickupRouteReportGeneralEntry,
			);

		const reportEntries = (
			await Promise.all(reports)
		).filter((report) => report !== null);
		const logEntries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			route,

			logEntries,
			reportEntries,
		};

		return loaderData;
	};
