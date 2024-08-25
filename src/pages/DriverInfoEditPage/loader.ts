import { getDriverWithId } from "$backend/database/get";
import { DriverFormData } from "$types/form";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverInfoEditPageLoaderData = {
	initFormData: DriverFormData;
};
export const driverInfoEditPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;

		if (driverId === undefined) {
			throw json(
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}

		const driverData = await getDriverWithId(
			driverId,
		);

		if (driverData === null) {
			throw json(
				{ message: "ไม่พบคนขับรถในระบบ" },
				{ status: 404 },
			);
		}

		const loaderData: DriverInfoEditPageLoaderData =
			{
				initFormData: driverData,
			};
		return loaderData;
	};
