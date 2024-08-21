import { getTopicAll } from "$backend/database/get";
import { LoaderFunction } from "react-router-dom";

export type DriverNewPageLoaderData = {
	topics: string[];
};
export const driverNewPageLoader: LoaderFunction =
	async () => {
		const topics = await getTopicAll();

		const loaderData: DriverNewPageLoaderData = {
			topics,
		};
		return loaderData;
	};
