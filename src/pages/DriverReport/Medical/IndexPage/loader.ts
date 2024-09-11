import {
	getDriverAll,
	getDriverReportMedicalAll,
} from "$backend/database/get";
import { DriverReportModelImpl } from "$types/impl/Driver";
import { DriverReportEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	preventAddReport: boolean;
	reportEntries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getDriverReportMedicalAll()
		).map(DriverReportModelImpl.toEntry);

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
