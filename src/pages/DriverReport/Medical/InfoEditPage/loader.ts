import {
	getDriver,
	getDriverReportMedical,
	getTopicAll,
} from "$backend/database/get";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	topicOptions: string[];
	driverOptions: DriverModel[];
	reportId: string;
	initFormData: DriverReportFormData;
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
		const model = await getDriverReportMedical(
			reportId,
		);
		if (model === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบผลการตรวจสารเสพติดในฐานข้อมูล (Cannot find report with given ID)",
				},
				{ status: 404 },
			);
		}
		const driver = await getDriver(
			model.driver_id,
		);
		if (driver === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับในฐานข้อมูล (Cannot find driver with ID given in report entry)",
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const driverOptions = [driver];
		const initFormData: DriverReportFormData = {
			content: model.content,
			datetime: model.datetime,
			topics: model.topics.split(","),
			title: model.title,
			driver,
		};
		const loaderData: InfoPageLoaderData = {
			driverOptions,
			topicOptions,
			initFormData,
			reportId,
		};
		return loaderData;
	};
