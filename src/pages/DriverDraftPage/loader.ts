import { LoaderFunction } from "react-router-dom";
import { DriverModel } from "../../types/models";
import { getDriverAll } from "../../api/tauri/database/get";

export type DriverDraftPageLoaderData = {
	drivers: DriverModel[];
};

export const driverDraftPageLoader: LoaderFunction =
	async () => {
		const drivers = await getDriverAll();

		const loaderData: DriverDraftPageLoaderData =
			{ drivers };

		return loaderData;
	};
