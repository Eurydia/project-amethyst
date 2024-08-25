import { DriverRegisterFormData } from "$types/FormData";
import { LoaderFunction } from "react-router-dom";

export type DriverNewPageLoaderData = {
	initFormData: DriverRegisterFormData;
};
export const driverNewPageLoader: LoaderFunction =
	async () => {
		const initFormData: DriverRegisterFormData = {
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
