import {
	getDriverAll,
	getDriverReportMedicalAll,
} from "$backend/database/get";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report-model";
import { DriverReportEntry } from "$types/models/driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	preventAddReport: boolean;
	reportEntries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getDriverReportMedicalAll()
		).map(
			DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
		);

		const reportEntries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const drivers = await getDriverAll();
		const preventAddReport = drivers.length === 0;

		const loaderData: IndexPageLoaderData = {
			preventAddReport,
			reportEntries,
		};
		return loaderData;
	};
