import { LoaderFunction } from "react-router-dom";
import {
	getDriverAll,
	getTopicAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models";

export type DriverDraftPageLoaderData = {
	drivers: DriverModel[];
	topics: string[];
};
export const driverReportPageLoader: LoaderFunction =
	async () => {
		const topics = await getTopicAll();
		const drivers = await getDriverAll();

		const loaderData: DriverDraftPageLoaderData =
			{
				topics,
				drivers,
			};

		return loaderData;
	};
