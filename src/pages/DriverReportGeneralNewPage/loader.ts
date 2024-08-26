import {
	getDriverAll,
	getTopicAll,
} from "$backend/database/get";
import { DriverReportFormData } from "$types/form-data";
import { DriverModel } from "$types/models";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type DriverReportGeneralNewPageLoaderData =
	{
		driverOptions: DriverModel[];
		topicOptions: string[];
		initFormData: DriverReportFormData;
	};
export const driverReportGeneralNewPageLoader: LoaderFunction =
	async () => {
		const topicOptions = await getTopicAll();
		const driverOptions = await getDriverAll();

		const initFormData: DriverReportFormData = {
			datetime: dayjs().format(),
			content: "",
			title: "",
			driver: null,
			topics: [],
		};

		const loaderData: DriverReportGeneralNewPageLoaderData =
			{
				initFormData,
				topicOptions,
				driverOptions,
			};

		return loaderData;
	};
