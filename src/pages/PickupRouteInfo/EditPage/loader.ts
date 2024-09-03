import { getPickupRoute } from "$backend/database/get";
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
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}
		const route = await getPickupRoute(routeId);
		if (route === null) {
			throw json(
				{ message: "ไม่พบคนขับรถในระบบ" },
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
