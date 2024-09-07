import {
	getVehicle,
	getVehicleReportInspection,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: VehicleReportInspectionModel;
	vehicle: VehicleModel;
	inspectionRoundNumber: number;
};
export const infoPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const reportId = parseInt(params.reportId);
		const report =
			await getVehicleReportInspection(reportId);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleInspectionReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const vehicle = await getVehicle(
			report.vehicle_id,
		);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const reports = (
			await getVehicleReportInspectionAll()
		)
			.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicle.id,
			)
			.toReversed();
		let inspectionRoundNumber = 0;
		for (const { id } of reports) {
			inspectionRoundNumber++;
			if (id === report.id) {
				break;
			}
		}

		const loaderData: InfoPageLoaderData = {
			report,
			inspectionRoundNumber,
			vehicle,
		};

		return loaderData;
	};
