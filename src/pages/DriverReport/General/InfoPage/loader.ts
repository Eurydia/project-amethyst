import {
	getDriver,
	getDriverReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverReport } from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: DriverReport;
};
export const infoPageLoader: LoaderFunction =
	async ({ params }) => {
		const { reportId } = params;
		if (reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const _report = await getDriverReportGeneral(
			reportId,
		);
		if (_report === null) {
			throw json(
				{
					message:
						TRANSLATION.driverGeneralReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const driver = await getDriver(
			_report.driver_id,
		);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.driverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const report: DriverReport = {
			id: _report.id,
			content: _report.content,
			datetime: _report.datetime,
			driverId: _report.driver_id,
			title: _report.title,
			topics: _report.topics
				.normalize()
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),

			driverName: driver.name,
			driverSurname: driver.surname,
		};

		const loaderData: InfoPageLoaderData = {
			report,
		};

		return loaderData;
	};
