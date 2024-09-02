import {
	getTopicAll,
	getVehicleReportGeneral,
	getVehicle,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportGeneralFormData,
} from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoEditPageLoaderData = {
	reportId: string;
	topicOptions: string[];
	vehicleOptions: VehicleModel[];
	initFormData: VehicleReportGeneralFormData;
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
		const report = await getVehicleReportGeneral(
			reportId,
		);
		if (report === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบรายการในฐานข้อมูล (Cannot find report with given ID)",
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
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับในฐานข้อมูล (Cannot find driver with ID given in report entry)",
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const vehicleOptions = [vehicle];
		const initFormData: VehicleReportGeneralFormData =
			{
				vehicle,
				content: report.content,
				datetime: report.datetime,
				title: report.title,
				topics: report.topics.split(","),
			};

		const loaderData: InfoEditPageLoaderData = {
			reportId,
			vehicleOptions,
			topicOptions,
			initFormData,
		};

		return loaderData;
	};
