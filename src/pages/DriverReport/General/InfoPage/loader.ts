import {
	getDriver,
	getDriverReportGeneral,
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
		if (params.reportId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.driverReportIdIsMissingFromParams,
				},
			);
		}
		const reportId = Number.parseInt(
			params.reportId,
		);
		const report = await getDriverReportGeneral(
			reportId,
		);
		if (report === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.driverGeneralReportIsMissingFromDatabase,
				},
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
