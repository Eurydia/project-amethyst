import { getDriver } from "$backend/database/get";
import { DriverFormData } from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type EditPageLoaderData = {
	initFormData: DriverFormData;
};
export const editPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;

		if (driverId === undefined) {
			throw json(
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}

		const initFormData = await getDriver(
			driverId,
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
