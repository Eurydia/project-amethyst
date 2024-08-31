import {
	json,
	LoaderFunction,
} from "react-router-dom";
import {
	getDriverWithId,
	getTopicAll,
} from "$backend/database/get";
import dayjs from "dayjs";
import { DriverReportFormData } from "$types/models/Driver";
import { DriverModel } from "$types/DriverModel";

export type ReportMedicalPageLoaderData = {
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const reportMedicalPageLoader: LoaderFunction =
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
			content: "",
			datetime: dayjs().format(),
			driver,
			title: "",
			topics: [],
		};

		const loaderData: ReportMedicalPageLoaderData =
			{
				driverOptions,
				initFormData,
				topicOptions,
			};

		return loaderData;
	};
