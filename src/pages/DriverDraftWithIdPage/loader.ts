import { LoaderFunction } from "react-router-dom";
import {
	getDriverAll,
	getTopicAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models";

export type DriverDraftPageLoaderData = {
	driverData: DriverModel;
	topics: string[];
};
export const driverDraftPageLoader: LoaderFunction =
	async ({ params }) => {
		const { id } = params;

		const topics = await getTopicAll();

		const loaderData: DriverDraftPageLoaderData =
			{
				topics,
				drivers,
			};

		return loaderData;
	};
