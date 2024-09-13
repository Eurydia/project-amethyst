import { getPickupRouteReportGeneralAll } from "$backend/database/get";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general-model";
import { PickupRouteReportEntry } from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	reportEntries: PickupRouteReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getPickupRouteReportGeneralAll()
		).map(
			PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toPickupRouteReportGeneralEntry,
		);

		const reportEntries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			reportEntries,
		};
		return loaderData;
	};
