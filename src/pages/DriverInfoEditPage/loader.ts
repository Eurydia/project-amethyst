import {
	getDriverWithId,
	getVehicleAll,
} from "$backend/database/get";
import {
	DriverFormData,
	VehicleModel,
} from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverInfoEditPageLoaderData = {
	vehicles: VehicleModel[];
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

		const vehicles = await getVehicleAll();
		const initFormData: DriverFormData =
			driverData;

		const loaderData: DriverInfoEditPageLoaderData =
			{
				vehicles,
				initFormData,
			};
		return loaderData;
	};
