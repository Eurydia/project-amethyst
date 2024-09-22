/** @format */

import { tauriGetDriverReportGeneral } from "$backend/database/get/driver-general-reports";
import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import { TH_LOCALE } from "$locale/th";
import { DriverModel } from "$types/models/driver";
import { DriverReportModel } from "$types/models/driver-report";
import { json, LoaderFunction } from "react-router-dom";

export type DriverReportGeneralInfoPageLoaderData = {
	report: DriverReportModel;
	driver: DriverModel;
	topicComboBoxOptions: string[];
};
export const driverReportGeneralInfoPageLoader: LoaderFunction = async ({
	params,
}) => {
	if (params.reportId === undefined) {
		throw json(
			{},
			{
				status: 400,
				statusText: TH_LOCALE.driverReportIdIsMissingFromParams,
			}
		);
	}
	const reportId = Number.parseInt(params.reportId);
	const report = await tauriGetDriverReportGeneral(reportId);
	if (report === null) {
		throw json(
			{},
			{
				status: 404,
				statusText: TH_LOCALE.driverGeneralReportIsMissingFromDatabase,
			}
		);
	}
	const driver = await tauriGetDriver(report.driver_id);
	if (driver === null) {
		throw json(
			{
				message: TH_LOCALE.errorDriverIsMissingFromDatabase,
			},
			{ status: 404 }
		);
	}

	const topicComboBoxOptions = await tauriGetTopicAll();

	const loaderData: DriverReportGeneralInfoPageLoaderData = {
		report,
		driver,
		topicComboBoxOptions,
	};

	return loaderData;
};
