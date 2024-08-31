import {
	getDriverAll,
	getTopicAll,
} from "$backend/database/get";
import { DriverReportFormData } from "$types/models/Driver";
import { DriverModel } from "$types/DriverModel";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const newPageLoader: LoaderFunction =
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

		const loaderData: NewPageLoaderData = {
			initFormData,
			topicOptions,
			driverOptions,
		};

		return loaderData;
	};
