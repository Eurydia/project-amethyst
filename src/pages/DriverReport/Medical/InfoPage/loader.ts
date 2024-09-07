import {
	getDriver,
	getDriverReportMedical,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: DriverReportModel;
	driver: DriverModel;
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
		const report = await getDriverReportMedical(
			Number.parseInt(reportId),
		);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.driverMedicalReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const driver = await getDriver(
			report.driver_id,
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

		const loaderData: InfoPageLoaderData = {
			report,
			driver,
		};

		return loaderData;
	};
