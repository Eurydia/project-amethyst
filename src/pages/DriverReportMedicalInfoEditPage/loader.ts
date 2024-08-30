import {
	getDriverGeneralReportWithId,
	getDriverWithId,
	getTopicAll,
} from "$backend/database/get";
import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverReportMedicalInfoPageLoaderData =
	{
		reportId: string;
		topicOptions: string[];
		driverOptions: DriverModel[];
		initFormData: DriverReportFormData;
	};
export const driverReportMedicalInfoEditPageLoader: LoaderFunction =
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
			await getDriverGeneralReportWithId(
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

		const driver = await getDriverWithId(
			rawEntry.driver_id,
		);

		if (driver === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบข้อมูลคนขับในฐานข้อมูล (404-Cannot find driver with ID given in report entry)",
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const driverOptions = [driver];
		const initFormData: DriverReportFormData = {
			content: rawEntry.content,
			datetime: rawEntry.datetime,
			topics: rawEntry.topics.split(","),
			driver: driver,
			title: rawEntry.title,
		};

		const loaderData: DriverReportMedicalInfoPageLoaderData =
			{
				driverOptions,
				topicOptions,
				initFormData,
				reportId: rawEntry.id,
			};

		return loaderData;
	};
