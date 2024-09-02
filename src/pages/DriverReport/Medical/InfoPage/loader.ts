import {
	getDriver,
	getDriverReportMedical,
} from "$backend/database/get";
import { DriverReport } from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	report: DriverReport;
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

		const report: DriverReport = {
			content: model.content,
			datetime: model.datetime,
			driverId: model.driver_id,
			driverName: driver.name,
			driverSurname: driver.surname,
			id: model.id,
			title: model.title,
			topics: model.topics
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),
		};

		const loaderData: InfoPageLoaderData = {
			report,
		};

		return loaderData;
	};
