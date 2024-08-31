import { DriverFormData } from "$types/form-data";
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
			license_type: "ท.1",
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
		};
		return loaderData;
	};
