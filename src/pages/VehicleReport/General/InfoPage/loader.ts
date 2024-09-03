import {
	getVehicle,
	getVehicleReportGeneral,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { VehicleReportGeneral } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: VehicleReportGeneral;
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

		const _report = await getVehicleReportGeneral(
			reportId,
		);
		if (_report === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleGeneralReportIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const vehicle = await getVehicle(
			_report.vehicle_id,
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

		const report: VehicleReportGeneral = {
			id: _report.id,
			datetime: _report.datetime,
			title: _report.title,
			content: _report.content,
			topics: _report.topics
				.normalize()
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),

			vehicleId: vehicle.id,
			vehicleLicensePlate: vehicle.license_plate,
		};

		const loaderData: InfoPageLoaderData = {
			report,
		};

		return loaderData;
	};
