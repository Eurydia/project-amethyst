import {
	getDriverAll,
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
		topics: report.topics
			.normalize()
			.split(",")
			.map((topic) => topic.trim())
			.filter((topic) => topic.length > 0),

		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,
	};
	return entry;
};

const toEntries = (
	reportAll: DriverReportModel[],
	driverAll: DriverModel[],
) => {
	const entries: DriverReportEntry[] = [];
	for (const report of reportAll) {
		const driver = driverAll.find(
			({ id }) => id === report.driver_id,
		);
		if (driver === undefined) {
			continue;
		}
		const entry = toEntry(report, driver);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reportAll =
			await getDriverReportMedicalAll();
		const driverAll = await getDriverAll();
		const entries = toEntries(
			reportAll,
			driverAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
