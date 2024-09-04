import {
	getVehicle,
	getVehicleReportInspection,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { VehicleReportInspection } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: VehicleReportInspection;
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
		const _report =
			await getVehicleReportInspection(
				Number.parseInt(reportId),
			);
		if (_report === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleInspectionReportIsMissingFromDatabase,
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

		const reportAll =
			await getVehicleReportInspectionAll();
		let count = 0;
		for (const { vehicle_id, id } of reportAll) {
			if (vehicle_id === vehicle.id) {
				count++;
			}
			if (id === _report.id) {
				break;
			}
		}

		const report: VehicleReportInspection = {
			frame: _report.frame,
			windows: _report.windows,
			frontCamera: _report.front_camera,
			content: _report.content,
			datetime: _report.datetime,
			overheadFan: _report.overhead_fan,
			id: _report.id,
			brakeLights: _report.brake_light,
			headlights: _report.headlights,
			turnSignals: _report.turn_signals,
			rearviewMirror: _report.rearview_mirror,
			sideviewMirror: _report.sideview_mirror,
			seatbelts: _report.seatbelts,
			seats: _report.seats,
			tires: _report.tires,
			vehicleId: _report.vehicle_id,
			vehicleLicensePlate: vehicle.license_plate,
			topics: _report.topics
				.normalize()
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),

			inspectionRoundNumber: count.toString(),
		};

		const loaderData: InfoPageLoaderData = {
			report,
		};

		return loaderData;
	};
