/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import {
	tauriGetVehicleReportInspection,
	tauriGetVehicleReportInspectionAll,
} from "$backend/database/get/vehicle-inspection-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { TH_LOCALE } from "$locale/th";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { json, LoaderFunction } from "react-router-dom";

export type VehicleReportInspectionInfoPageLoaderData = {
	report: VehicleReportInspectionModel;
	vehicle: VehicleModel;
	inspectionRoundNumber: number;
	topicComboBoxOptions: string[];
};
export const vehicleReportInspectionInfoPageLoader: LoaderFunction = async ({
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
	const reportId = parseInt(params.reportId);
	const report = await tauriGetVehicleReportInspection(reportId);
	if (report === null) {
		throw json(
			{},
			{
				status: 404,
				statusText: TH_LOCALE.vehicleInspectionReportIsMissingFromDatabase,
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
	const reports = (await tauriGetVehicleReportInspectionAll())
		.filter(({ vehicle_id }) => vehicle_id === vehicle.id)
		.toReversed();
	let inspectionRoundNumber = 0;
	for (const { id } of reports) {
		inspectionRoundNumber++;
		if (id === report.id) {
			break;
		}
	}

	const loaderData: VehicleReportInspectionInfoPageLoaderData = {
		report,
		inspectionRoundNumber,
		topicComboBoxOptions,
		vehicle,
	};

	return loaderData;
};
