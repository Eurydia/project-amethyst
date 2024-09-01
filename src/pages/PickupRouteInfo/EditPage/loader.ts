import { getPickupRoute } from "$backend/database/get";
import { PickupRouteFormData } from "$types/models/PickupRoute";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
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

		const initFormData = await getPickupRoute(
			routeId,
		);

		if (initFormData === null) {
			throw json(
				{ message: "ไม่พบคนขับรถในระบบ" },
				{ status: 404 },
			);
		}

		const loaderData: EditPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
