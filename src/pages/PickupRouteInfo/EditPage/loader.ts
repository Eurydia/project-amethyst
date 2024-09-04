import { getPickupRoute } from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { PickupRouteFormData } from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	routeId: string;
	initFormData: PickupRouteFormData;
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const route = await getPickupRoute(
			Number.parseInt(routeId),
		);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const initFormData: PickupRouteFormData = {
			name: route.name,
			arrivalTime: route.arrival_time,
			departureTime: route.departure_time,
		};
		const loaderData: EditPageLoaderData = {
			initFormData,
			routeId,
		};
		return loaderData;
	};
