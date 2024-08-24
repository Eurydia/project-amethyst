import {
	getDriverAll,
	getTopicAll,
} from "$backend/database/get";
import {
	DriverModel,
	DriverReportFormData,
} from "$types/models";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type DriverReportGeneralNewPageLoaderData =
	{
		drivers: DriverModel[];
		topics: string[];
		initFormData: DriverReportFormData;
	};
export const driverReportGeneralNewPageLoader: LoaderFunction =
	async () => {
		const topics = await getTopicAll();
		const drivers = await getDriverAll();
		const initFormData: DriverReportFormData = {
			datetime_iso: dayjs().locale("th").format(),
			content: "",
			driver_id: "",
			driver_name: "",
			driver_surname: "",
			topics: "",
			title: "",
		};
		const loaderData: DriverReportGeneralNewPageLoaderData =
			{
				initFormData,
				topics,
				drivers,
			};

		return loaderData;
	};
