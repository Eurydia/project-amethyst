import { PickupRouteFormData } from "$types/models/PickupRoute";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: PickupRouteFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const initFormData: PickupRouteFormData = {
			name: "",
			arrival_time: "08:00",
			departure_time: "17:00",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
