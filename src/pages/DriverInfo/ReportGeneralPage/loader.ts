import {
	json,
	LoaderFunction,
} from "react-router-dom";
import {
	getDriver,
	getTopicAll,
} from "$backend/database/get";
import dayjs from "dayjs";
import "dayjs/locale/th";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";

export type ReportGeneralPageLoaderData = {
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
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
		const topicOptions = await getTopicAll();
		const driverOptions = [driver];
		const initFormData: DriverReportFormData = {
			driver,
			datetime: dayjs().format(),
			content: "",
			title: "",
			topics: [],
		};
		const loaderData: ReportGeneralPageLoaderData =
			{
				driverOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
