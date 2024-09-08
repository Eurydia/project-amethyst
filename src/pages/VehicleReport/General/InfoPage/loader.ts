import {
	getVehicle,
	getVehicleReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportGeneralModel,
} from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: VehicleReportGeneralModel;
	vehicle: VehicleModel;
};
export const infoPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.reportId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.vehicleReportIdIsMissingFromParams,
				},
			);
		}
		const reportId = Number.parseInt(
			params.reportId,
		);
		const report = await getVehicleReportGeneral(
			reportId,
		);
		if (report === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.vehicleGeneralReportIsMissingFromDatabase,
				},
			);
		}
		const vehicle = await getVehicle(
			report.vehicle_id,
		);
		if (vehicle === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
			);
		}

		const loaderData: InfoPageLoaderData = {
			report,
			vehicle,
		};

		return loaderData;
	};
