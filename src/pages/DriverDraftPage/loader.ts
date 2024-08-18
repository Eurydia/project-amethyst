import { LoaderFunction } from "react-router-dom";
import { DriverModel } from "../../types/models";
import {
	getDriverAll,
	getTopicAll,
} from "../../api/tauri/database/get";

export type DriverDraftPageLoaderData = {
	drivers: DriverModel[];
	topics: string[];
};

export const driverDraftPageLoader: LoaderFunction =
	async () => {
		const drivers = await getDriverAll();
		const topics = await getTopicAll();

		const loaderData: DriverDraftPageLoaderData =
			{ drivers, topics };

		return loaderData;
	};
