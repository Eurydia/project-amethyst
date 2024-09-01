import {
	getVehicleReportGeneralWithId,
	getVehicle,
} from "$backend/database/get";
import { VehicleReportGeneral } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	entry: VehicleReportGeneral;
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
			await getVehicleReportGeneralWithId(
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

		const entry: VehicleReportGeneral = {
			id: rawEntry.id,
			datetime: rawEntry.datetime,
			title: rawEntry.title,
			content: rawEntry.content,
			topics: rawEntry.topics.split(","),
			vehicleId: vehicle.id,
			vehicleLicensePlate: vehicle.license_plate,
		};

		const loaderData: InfoPageLoaderData = {
			entry,
		};

		return loaderData;
	};
