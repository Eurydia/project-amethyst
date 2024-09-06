import { LoaderFunction } from "react-router-dom";

export type HomePageLoaderData = {};
export const homePageLoader: LoaderFunction =
	async () => {
		const loaderData: HomePageLoaderData = {};
		return loaderData;
	};
