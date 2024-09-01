import {
	getVehicleReportInspectionWithId,
	getVehicle,
} from "$backend/database/get";
import { VehicleReportInspection } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	entry: VehicleReportInspection;
};
export const infoPageLoader: LoaderFunction =
	async ({ params }) => {
		const { reportId } = params;
		if (reportId === undefined) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (400-Missing report ID in params)",
				},
				{ status: 400 },
			);
		}

		const rawEntry =
			await getVehicleReportInspectionWithId(
				reportId,
			);
		if (rawEntry === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบรายการในฐานข้อมูล (404-Cannot find report with given ID)",
				},
				{ status: 404 },
			);
		}

		const vehicle = await getVehicle(
			rawEntry.vehicle_id,
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

		const entry: VehicleReportInspection = {
			bodyFrame: rawEntry.frame,
			bodyWindow: rawEntry.windows,
			cameraFrontCam: rawEntry.front_camera,
			content: rawEntry.content,
			datetime: rawEntry.datetime,
			fanOverhead: rawEntry.fan_overhead,
			id: rawEntry.id,
			lightBrakeLight: rawEntry.brake_light,
			lightHeadlights: rawEntry.headlights,
			lightTurnSignals: rawEntry.turn_signals,
			mirrorRearview: rawEntry.rearview_mirror,
			mirrorSideview: rawEntry.sideview_mirror,
			seatSeatbelts: rawEntry.seatbelts,
			seatSeats: rawEntry.seats,
			tires: rawEntry.tires,
			vehicleId: rawEntry.vehicle_id,
			vehicleLicensePlate: vehicle.license_plate,
			topics: rawEntry.topics.split(","),
		};

		const loaderData: InfoPageLoaderData = {
			entry,
		};

		return loaderData;
	};
