import {
	getDriverAll,
	getDriverReportGeneralAll,
} from "$backend/database/get";
import { DriverReportModelImpl } from "$types/impl/Driver";
import { DriverReportEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	reportEntries: DriverReportEntry[];
	databaseIsMissingDriver: boolean;
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports = (
			await getDriverReportGeneralAll()
		).map(DriverReportModelImpl.toEntry);

		const reportEntries = (
			await Promise.all(reports)
		).filter((entry) => entry !== null);

		const drivers = await getDriverAll();
		const databaseIsMissingDriver =
			drivers.length === 0;
		const loaderData: IndexPageLoaderData = {
			reportEntries,
			databaseIsMissingDriver,
		};
		return loaderData;
	};
