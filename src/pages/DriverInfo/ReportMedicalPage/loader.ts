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
	driver: DriverModel;
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const reportMedicalPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.driverId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.driverIdIsMissingFromParams,
				},
			);
		}
		const driverId = Number.parseInt(
			params.driverId,
		);
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.errorDriverIsMissingFromDatabase,
				},
			);
		}
		const topicOptions = await getTopicAll();
		const initFormData: DriverReportFormData = {
			datetime: dayjs().format(),
			content: "",
			driver,
			title: "",
			topics: [],
		};
		const loaderData: ReportMedicalPageLoaderData =
			{
				driver,
				initFormData,
				topicOptions,
			};
		return loaderData;
	};
