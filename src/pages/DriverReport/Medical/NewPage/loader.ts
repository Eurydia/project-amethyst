import {
	getDriver,
	getDriverAll,
	getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models/driver";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	selectedDriver: DriverModel | null;
	driverSelectOptions: DriverModel[];
	topicComboBoxOptions: string[];
	initFormData: DriverReportFormData;
};
export const newPageLoader: LoaderFunction =
	async ({ request }) => {
		const url = new URL(request.url);
		const queryDriverId =
			url.searchParams.get("driverId");

		let driver: DriverModel | null = null;
		let selectedDriver: DriverModel | null = null;
		let driverSelectOptions: DriverModel[] = [];
		if (queryDriverId !== null) {
			driver = await getDriver(
				Number.parseInt(queryDriverId),
			);
			if (driver === null) {
				throw json(
					{},
					{
						status: 400,
						statusText:
							TRANSLATION.errorNoDriverInDatabase,
					},
				);
			}
			selectedDriver = driver;
			driverSelectOptions = [driver];
		} else {
			driverSelectOptions = await getDriverAll();
			if (driverSelectOptions.length === 0) {
				throw json(
					{},
					{
						status: 400,
						statusText:
							TRANSLATION.errorNoDriverInDatabase,
					},
				);
			}
			driver = driverSelectOptions[0];
		}
		const topicComboBoxOptions =
			await getTopicAll();

		const initFormData: DriverReportFormData = {
			driver,
			datetime: dayjs().format(),
			content: "",
			title: "",
			topics: [],
		};
		const loaderData: NewPageLoaderData = {
			selectedDriver,
			initFormData,
			topicComboBoxOptions,
			driverSelectOptions,
		};
		return loaderData;
	};
