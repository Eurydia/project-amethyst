import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {};
export const indexPageLoader: LoaderFunction =
	async () => {
		const loaderData: IndexPageLoaderData = {};
		return loaderData;
	};
