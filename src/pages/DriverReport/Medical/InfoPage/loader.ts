import {
	getDriverGeneralReportWithId,
	getDriverWithId,
} from "$backend/database/get";
import { DriverReport } from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type InfoPageLoaderData = {
	entry: DriverReport;
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

		const entry: DriverReport = {
			title: rawEntry.title,
			content: rawEntry.content,
			datetime: rawEntry.datetime,
			driver_id: rawEntry.driver_id,
			id: rawEntry.id,
			topics: rawEntry.topics.split(","),
			driver_name: driver.name,
			driver_surname: driver.surname,
		};

		const loaderData: InfoPageLoaderData = {
			entry,
		};

		return loaderData;
	};
