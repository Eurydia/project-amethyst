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
	inspectionRoundNumber: string;
	reportId: string;
	topicOptions: string[];
	vehicleOptions: VehicleModel[];
	initFormData: VehicleReportInspectionFormData;
};
export const infoEditPageLoader: LoaderFunction =
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

		const reportAll =
			await getVehicleReportInspectionAll();
		let count = 0;
		for (const { vehicle_id, id } of reportAll) {
			if (vehicle_id === vehicle.id) {
				count++;
			}
			if (id === report.id) {
				break;
			}
		}

		const topicOptions = await getTopicAll();
		const vehicleOptions = [vehicle];
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
			inspectionRoundNumber: count.toString(),
			vehicleOptions,
			topicOptions,
			initFormData,
			reportId,
		};

		return loaderData;
	};
