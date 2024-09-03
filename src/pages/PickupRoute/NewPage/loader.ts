import { PickupRouteFormData } from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: PickupRouteFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const initFormData: PickupRouteFormData = {
			name: "",
			arrivalTime: "",
			departureTime: "",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
