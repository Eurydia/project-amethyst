import {
	getTopicAll,
	getVehicle,
	getVehicleReportInspection,
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
	vehicleSelectOptions: VehicleModel[];
	initFormData: VehicleReportInspectionFormData;
};
export const infoEditPageLoader: LoaderFunction =
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

		const topicComboBoxOptions =
			await getTopicAll();
		const vehicleSelectOptions = [vehicle];

		const initFormData: VehicleReportInspectionFormData =
			{
				datetime: report.datetime,
				content: report.content,
				frame: report.frame,
				windows: report.windows,
				frontCamera: report.front_camera,
				overheadFan: report.overhead_fan,
				brakeLights: report.brake_light,
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

		const loaderData: InfoPageLoaderData = {
			vehicleSelectOptions,
			topicComboBoxOptions,
			initFormData,
			reportId,
		};

		return loaderData;
	};
