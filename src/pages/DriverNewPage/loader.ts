import { getVehicleAll } from "$backend/database/get";
import {
	DriverFormData,
	VehicleModel,
} from "$types/models";
import { LoaderFunction } from "react-router-dom";

export type DriverNewPageLoaderData = {
	vehicles: VehicleModel[];
	initFormData: DriverFormData;
};
export const driverNewPageLoader: LoaderFunction =
	async () => {
		const vehicles = await getVehicleAll();
		const initFormData: DriverFormData = {
			name: "",
			surname: "",
			contact: "",
			license_type: "1",
			current_vehicle_id: "",
		};
		const loaderData: DriverNewPageLoaderData = {
			vehicles,
			initFormData,
		};
		return loaderData;
	};
