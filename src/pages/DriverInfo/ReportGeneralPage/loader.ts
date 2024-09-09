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
import "dayjs/locale/th";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type ReportGeneralPageLoaderData = {
	driver: DriverModel;
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const reportGeneralPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.driverIdIsMissingFromParams,
				},
			);
		}
		const driver = await getDriver(
			Number.parseInt(driverId),
		);
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
			driver,
			content: "",
			title: "",
			topics: [],
		};
		const loaderData: ReportGeneralPageLoaderData =
			{
				driver,
				initFormData,
				topicOptions,
			};
		return loaderData;
	};
