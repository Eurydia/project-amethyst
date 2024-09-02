import {
	getTopicAll,
	getVehicle,
	getVehicleReportInspection,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportInspectionFormData,
} from "$types/models/Vehicle";
import {
	LoaderFunction,
	json,
} from "react-router-dom";

const getInspectionRoundNumber = async (
	reportId: string,
	vehicleId: string,
) => {
	const reports =
		await getVehicleReportInspectionAll();
	let roundNumber = 0;
	for (const report of reports) {
		if (report.vehicle_id === vehicleId) {
			roundNumber++;
		}
		if (report.id === reportId) {
			break;
		}
	}
	return roundNumber.toString();
};

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
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing report ID in params)",
				},
				{ status: 400 },
			);
		}
		const rawReport =
			await getVehicleReportInspection(reportId);
		if (rawReport === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบรายการในฐานข้อมูล (Cannot find report with given ID)",
				},
				{ status: 404 },
			);
		}
		const vehicle = await getVehicle(
			rawReport.vehicle_id,
		);
		if (vehicle === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับในฐานข้อมูล (Cannot find driver with ID given in report entry)",
				},
				{ status: 404 },
			);
		}

		const inspectionRoundNumber =
			await getInspectionRoundNumber(
				reportId,
				rawReport.vehicle_id,
			);
		const topicOptions = await getTopicAll();
		const vehicleOptions = [vehicle];
		const initFormData: VehicleReportInspectionFormData =
			{
				vehicle,
				datetime: rawReport.datetime,
				topics: rawReport.topics.split(","),
				content: rawReport.content,

				frame: rawReport.frame,
				windows: rawReport.windows,
				frontCamera: rawReport.front_camera,
				overheadFan: rawReport.overhead_fan,
				brakeLights: rawReport.brake_light,
				headlights: rawReport.headlights,
				turnSignals: rawReport.turn_signals,
				rearviewMirror: rawReport.rearview_mirror,
				sideviewMirror: rawReport.sideview_mirror,
				seatbelts: rawReport.seatbelts,
				seats: rawReport.seats,
				tires: rawReport.tires,
			};

		const loaderData: InfoPageLoaderData = {
			inspectionRoundNumber,
			vehicleOptions,
			topicOptions,
			initFormData,
			reportId,
		};

		return loaderData;
	};
