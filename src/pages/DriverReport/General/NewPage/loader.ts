import {
	getDriver,
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
	selectedDriver: DriverModel | null;
	driverOptions: DriverModel[];
	topicOptions: string[];
	initFormData: DriverReportFormData;
};
export const newPageLoader: LoaderFunction =
	async ({ request }) => {
		const url = new URL(request.url);
		const queryDriverId =
			url.searchParams.get("driverId");

		let selectedDriver: DriverModel | null = null;
		let driver: DriverModel | null = null;
		let driverOptions: DriverModel[] = [];

		if (queryDriverId !== null) {
			driver = await getDriver(
				Number.parseInt(queryDriverId),
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
			selectedDriver = driver;
			driverOptions = [driver];
		} else {
			driverOptions = await getDriverAll();
			if (driverOptions.length === 0) {
				throw json(
					{},
					{
						status: 400,
						statusText:
							TRANSLATION.errorNoDriverInDatabase,
					},
				);
			}
			driver = driverOptions[0];
		}

		const topicOptions = await getTopicAll();
		const initFormData: DriverReportFormData = {
			datetime: dayjs().format(),
			title: "",
			content: "",
			driver,
			topics: [],
		};
		const loaderData: NewPageLoaderData = {
			selectedDriver,
			initFormData,
			topicOptions,
			driverOptions,
		};
		return loaderData;
	};
