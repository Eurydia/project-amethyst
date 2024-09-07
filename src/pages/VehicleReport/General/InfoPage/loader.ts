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
		const { reportId } = params;
		if (reportId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleReportIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}

		const report = await getVehicleReportGeneral(
			Number.parseInt(reportId),
		);
		if (report === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleGeneralReportIsMissingFromDatabase,
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

		const loaderData: InfoPageLoaderData = {
			report,
			vehicle,
		};

		return loaderData;
	};
