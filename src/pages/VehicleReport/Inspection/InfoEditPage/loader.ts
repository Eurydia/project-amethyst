import {
	getTopicAll,
	getVehicle,
	getVehicleReportInspection,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	VehicleModel,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import {
	LoaderFunction,
	json,
} from "react-router-dom";

export type InfoPageLoaderData = {
	reportId: number;
	topicComboBoxOptions: string[];
	inspectionRoundNumber: number;
	vehicle: VehicleModel;
	initFormData: VehicleReportInspectionFormData;
};
export const infoEditPageLoader: LoaderFunction =
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
		const reportId = parseInt(params.reportId);
		const report =
			await getVehicleReportInspection(reportId);
		if (report === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.vehicleInspectionReportIsMissingFromDatabase,
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

		const topicComboBoxOptions =
			await getTopicAll();

		const initFormData: VehicleReportInspectionFormData =
			{
				datetime: report.datetime,
				content: report.content,
				frame: report.frame,
				windows: report.windows,
				frontCamera: report.front_camera,
				overheadFan: report.overhead_fan,
				brakeLight: report.brake_light,
				headlights: report.headlights,
				turnSignals: report.turn_signals,
				rearviewMirror: report.rearview_mirror,
				sideviewMirror: report.sideview_mirror,
				seatbelts: report.seatbelts,
				seats: report.seats,
				tires: report.tires,
				topics: report.topics
					.normalize()
					.split(",")
					.map((topic) => topic.trim())
					.filter((topic) => topic.length > 0),
				vehicle,
			};

		const reports = (
			await getVehicleReportInspectionAll()
		)
			.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicle.id,
			)
			.toReversed();

		let inspectionRoundNumber = 0;
		for (const report of reports) {
			inspectionRoundNumber++;
			if (report.id === reportId) {
				break;
			}
		}

		const loaderData: InfoPageLoaderData = {
			inspectionRoundNumber,
			reportId,
			vehicle,
			topicComboBoxOptions,
			initFormData,
		};

		return loaderData;
	};
