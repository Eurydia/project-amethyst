import { getDriverAll } from "$backend/database/get";
import { DriverFormData } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: DriverFormData;
	driverId: string;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const drivers = await getDriverAll();
		const driverId = drivers.length.toString();
		const initFormData: DriverFormData = {
			name: "",
			surname: "",
			contact: "",
			licenseType: "",
		};
		const loaderData: NewPageLoaderData = {
			driverId,
			initFormData,
		};
		return loaderData;
	};
