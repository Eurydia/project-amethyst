import { getPickupRoute } from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { PickupRouteFormData } from "$types/models/pickup-route";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	routeId: number;
	initFormData: PickupRouteFormData;
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.routeId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
			);
		}
		const routeId = Number.parseInt(
			params.routeId,
		);
		const route = await getPickupRoute(routeId);
		if (route === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
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
