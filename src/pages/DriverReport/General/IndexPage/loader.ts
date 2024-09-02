import {
	getDriver,
	getDriverReportMedicalAll,
} from "$backend/database/get";
import {
	DriverModel,
	DriverReportEntry,
	DriverReportModel,
} from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	report: DriverReportModel,
	driver: DriverModel,
) => {
	const entry: DriverReportEntry = {
		datetime: report.datetime,
		id: report.id,
		title: report.title,
		topics: report.topics.split(","),

		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,
	};
	return entry;
};
export type IndexPageLoaderData = {
	entries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports =
			await getDriverReportMedicalAll();
		const entries: DriverReportEntry[] = [];
		for (const report of reports) {
			const driver = await getDriver(report.id);
			if (driver === null) {
				continue;
			}
			const entry = toEntry(report, driver);
			entries.push(entry);
		}

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
