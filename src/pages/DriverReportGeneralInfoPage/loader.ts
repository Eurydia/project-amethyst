import {
	getDriverGeneralReportWithId,
	getDriverWithId,
} from "$backend/database/get";
import {
	DriverModel,
	DriverReportModel,
} from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverReportGeneralInfoPageLoaderData =
	{
		entry: DriverReportModel;
		driver: DriverModel;
	};
export const driverReportGeneralInfoPageLoader: LoaderFunction =
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

		const entry =
			await getDriverGeneralReportWithId(
				reportId,
			);
		if (entry === null) {
			throw json(
				{
					message:
						"ไม่สามารถแสดงหน้าที่ต้องการได้ เนื่องจากไม่พบรายการในฐานข้อมูล (404-Cannot find report with given ID)",
				},
				{ status: 404 },
			);
		}

		const driver = await getDriverWithId(
			entry.driver_id,
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

		const loaderData: DriverReportGeneralInfoPageLoaderData =
			{
				entry,
				driver,
			};

		return loaderData;
	};
