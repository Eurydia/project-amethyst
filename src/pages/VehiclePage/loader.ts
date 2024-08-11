import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type VehiclePageLoaderData = {
	vehicleId: string;
};

export const vehiclePageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{ message: "Vehicle ID is required" },
				{ status: 400 },
			);
		}

		const loaderData: VehiclePageLoaderData = {
			vehicleId,
		};

		return loaderData;
	};
