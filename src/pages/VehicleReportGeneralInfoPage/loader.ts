/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportGeneral } from "$backend/database/get/vehicle-general-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { TH_LOCALE } from "$locale/th";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralModel } from "$types/models/vehicle-report-general";
import { json, LoaderFunction } from "react-router-dom";

export type VehicleReportGeneralInfoPageLoaderData = {
	report: VehicleReportGeneralModel;
	vehicle: VehicleModel;
	topicComboBoxOptions: string[];
};
export const vehicleReportGeneralInfoPageLoader: LoaderFunction = async ({
	params,
}) => {
	if (params.reportId === undefined) {
		throw json(
			{},
			{
				status: 400,
				statusText: TH_LOCALE.vehicleReportIdIsMissingFromParams,
			}
		);
	}
	const reportId = Number.parseInt(params.reportId);
	const report = await tauriGetVehicleReportGeneral(reportId);
	if (report === null) {
		throw json(
			{},
			{
				status: 404,
				statusText: TH_LOCALE.vehicleGeneralReportIsMissingFromDatabase,
			}
		);
	}
	const vehicle = await tauriGetVehicle(report.vehicle_id);
	if (vehicle === null) {
		throw json(
			{},
			{
				status: 404,
				statusText: TH_LOCALE.errorVehicleIsMissingFromDatabase,
			}
		);
	}
	const topicComboBoxOptions = await tauriGetTopicAll();

	const loaderData: VehicleReportGeneralInfoPageLoaderData = {
		report,
		vehicle,
		topicComboBoxOptions,
	};

	return loaderData;
};
