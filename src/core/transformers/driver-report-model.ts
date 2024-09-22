/** @format */

import { tauriGetDriver } from "$backend/database/get/drivers";
import {
	DriverReportEntry,
	DriverReportModel,
} from "$types/models/driver-report";

export const DRIVER_REPORT_MODEL_TRANSFORMER = {
	toDriverReportEntry: async (report: DriverReportModel) => {
		const driver = await tauriGetDriver(report.driver_id);
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
