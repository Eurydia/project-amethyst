import {
	getVehicle,
	getVehicleReportInspection,
} from "$backend/database/get";
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
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing report ID in params)",
				},
				{ status: 400 },
			);
		}
		const reportModel =
			await getVehicleReportInspection(reportId);
		if (reportModel === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบรายการในฐานข้อมูล (Cannot find report with given ID)",
				},
				{ status: 404 },
			);
		}
		const vehicle = await getVehicle(
			reportModel.vehicle_id,
		);
		if (vehicle === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับในฐานข้อมูล (404-Cannot find driver with ID given in report entry)",
				},
				{ status: 404 },
			);
		}

		const report: VehicleReportInspection = {
			frame: reportModel.frame,
			windows: reportModel.windows,
			frontCamera: reportModel.front_camera,
			content: reportModel.content,
			datetime: reportModel.datetime,
			overheadFan: reportModel.overhead_fan,
			id: reportModel.id,
			brakeLights: reportModel.brake_light,
			headlights: reportModel.headlights,
			turnSignals: reportModel.turn_signals,
			rearviewMirror: reportModel.rearview_mirror,
			sideviewMirror: reportModel.sideview_mirror,
			seatbelts: reportModel.seatbelts,
			seats: reportModel.seats,
			tires: reportModel.tires,
			vehicleId: reportModel.vehicle_id,
			vehicleLicensePlate: vehicle.license_plate,
			topics: reportModel.topics.split(","),
		};

		const loaderData: InfoPageLoaderData = {
			report,
		};

		return loaderData;
	};
