import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type PickupRoutePageLoaderData = {
	routeId: string;
};

export const pickupRoutePageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;

		if (routeId === undefined) {
			throw json({
				status: 404,
				message: "Route not found",
			});
		}

		const loaderData: PickupRoutePageLoaderData =
			{ routeId };

		return loaderData;
	};
