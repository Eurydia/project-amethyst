import { getVehicleReportGeneralAll } from "$backend/database/get";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general-model";
import { VehicleReportGeneralEntry } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	reportEntries: VehicleReportGeneralEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getVehicleReportGeneralAll()
		).map(
			VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toVehicleReportGeneralEntry,
		);

		const reportEntries = (
			await Promise.all(reports)
		).filter((report) => report !== null);

		const loaderData: IndexPageLoaderData = {
			reportEntries,
		};
		return loaderData;
	};
