import {
	getDriver,
	getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/Driver";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type ReportMedicalPageLoaderData = {
	driverId: string;
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
						TRANSLATION.driverIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const driver = await getDriver(
			Number.parseInt(driverId),
		);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.driverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const topicOptions = await getTopicAll();
		const driverOptions = [driver];
		const initFormData: DriverReportFormData = {
			content: "",
			datetime: dayjs().format(),
			driver,
			title: "",
			topics: [],
		};
		const loaderData: ReportMedicalPageLoaderData =
			{
				driverId,
				driverOptions,
				initFormData,
				topicOptions,
			};
		return loaderData;
	};
