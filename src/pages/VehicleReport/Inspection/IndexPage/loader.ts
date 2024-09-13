import { getVehicleReportInspectionAll } from "$backend/database/get";
import { VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-inspection-model";
import { VehicleReportInspectionEntry } from "$types/models/vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	reportEntries: VehicleReportInspectionEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getVehicleReportInspectionAll()
		).map(
			VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER.toVehicleReportInspectionEntry,
		);

		const reportEntries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			reportEntries,
		};
		return loaderData;
	};
