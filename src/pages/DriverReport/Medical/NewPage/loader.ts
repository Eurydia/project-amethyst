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
	driverSelectOptions: DriverModel[];
	topicComboBoxOptions: string[];
	initFormData: DriverReportFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const driverSelectOptions =
			await getDriverAll();
		if (driverSelectOptions.length === 0) {
			throw json(
				{
					message:
						TRANSLATION.errorNoDriverInDatabase,
				},
				{
					status: 400,
				},
			);
		}
		const topicComboBoxOptions =
			await getTopicAll();

		const driver = driverSelectOptions[0];

		const initFormData: DriverReportFormData = {
			driver,
			datetime: dayjs().format(),
			content: "",
			title: "",
			topics: [],
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
			topicComboBoxOptions,
			driverSelectOptions,
		};
		return loaderData;
	};
