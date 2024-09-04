import {
	getDriver,
	getDriverReportMedical,
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
		const _report = await getDriverReportMedical(
			Number.parseInt(reportId),
		);
		if (_report === null) {
			throw json(
				{
					message:
						TRANSLATION.driverMedicalReportIsMissingFromDatabase,
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
			content: _report.content,
			datetime: _report.datetime,
			driverId: _report.driver_id,
			id: _report.id,
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
