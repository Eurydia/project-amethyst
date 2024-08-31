import {
	json,
	LoaderFunction,
} from "react-router-dom";
import {
	getDriverWithId,
	getTopicAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { DriverReportFormData } from "$types/form-data";

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
				{ message: "ข้อมูลคนขับรถไม่ถูกต้อง" },
				{ status: 400 },
			);
		}

		const driver = await getDriverWithId(
			driverId,
		);
		if (driver === null) {
			throw json(
				{ message: "ไม่พบข้อมูลคนขับรถ" },
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const driverOptions: DriverModel[] = [driver];
		const initFormData: DriverReportFormData = {
			datetime: dayjs().format(),
			driver,
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
