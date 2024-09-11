import { getDriver } from "$backend/database/get";
import {
	DriverReportEntry,
	DriverReportModel,
} from "$types/models/Driver";

export const DriverReportModelImpl = {
	toEntry: async (report: DriverReportModel) => {
		const driver = await getDriver(
			report.driver_id,
		);
		if (driver === null) {
			return null;
		}
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
	},
};
