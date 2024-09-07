import {
	getDriverAll,
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

export type NewPageLoaderData = {
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const driverOptions = await getDriverAll();
		if (driverOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoDriverInDatabase,
				},
				{ status: 400 },
			);
		}
		const driver = driverOptions[0];

		const topicOptions = await getTopicAll();

		const initFormData: DriverReportFormData = {
			datetime: dayjs().format(),
			content: "",
			title: "",
			driver,
			topics: [],
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
			topicOptions,
			driverOptions,
		};
		return loaderData;
	};
