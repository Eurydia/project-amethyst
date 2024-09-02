import {
	json,
	LoaderFunction,
} from "react-router-dom";
import {
	getDriver,
	getDriverMedicalReportAllWithDriverId,
	getTopicAll,
} from "$backend/database/get";
import dayjs from "dayjs";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";

export type ReportMedicalPageLoaderData = {
	reportId: string;
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const reportMedicalPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากข้อมูลไม่ครบถ้วน (Missing driverId in params)",
				},
				{ status: 400 },
			);
		}
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{
					message:
						"ไม่พบข้อมูลคนขับที่ต้องการฐานข้อมูล (Cannot find driver with given ID)",
				},
				{ status: 404 },
			);
		}
		const reports =
			await getDriverMedicalReportAllWithDriverId(
				driverId,
			);
		const reportId = reports.length.toString();
		const topicOptions = await getTopicAll();
		const driverOptions: DriverModel[] = [driver];
		const initFormData: DriverReportFormData = {
			content: "",
			datetime: dayjs().format(),
			driver,
			title: "",
			topics: [],
		};
		const loaderData: ReportMedicalPageLoaderData =
			{
				reportId,
				driverOptions,
				initFormData,
				topicOptions,
			};
		return loaderData;
	};
