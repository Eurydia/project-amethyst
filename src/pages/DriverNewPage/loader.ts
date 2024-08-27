import { DriverFormData } from "$types/form-data";
import { LoaderFunction } from "react-router-dom";

export type DriverNewPageLoaderData = {
	initFormData: DriverFormData;
};
export const driverNewPageLoader: LoaderFunction =
	async () => {
		const initFormData: DriverFormData = {
			name: "",
			surname: "",
			contact: "",
			license_type: "1",
		};
		const loaderData: DriverNewPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
