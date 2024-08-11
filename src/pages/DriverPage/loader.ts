import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverPageLoaderData = {
	driverId: string;
};

export const driverPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{ message: "Driver ID is required" },
				{ status: 400 },
			);
		}

		const loaderData: DriverPageLoaderData = {
			driverId,
		};

		return loaderData;
	};
