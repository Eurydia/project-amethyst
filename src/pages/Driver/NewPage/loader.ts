import { DriverFormData } from "$types/models/driver";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: DriverFormData;
};
export const newPageLoader: LoaderFunction =
	async () => {
		const initFormData: DriverFormData = {
			name: "",
			surname: "",
			contact: "",
			licenseType: "",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
