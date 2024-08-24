import {
	getDriverWithId,
	getVehicleAll,
	getVehicleWithId,
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
	initVehicle: VehicleModel | null;
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
		const initVehicle = await getVehicleWithId(
			driverData.current_vehicle_id,
		);
		const initFormData: DriverFormData =
			driverData;

		const loaderData: DriverInfoEditPageLoaderData =
			{
				vehicles,
				initVehicle,
				initFormData,
			};
		return loaderData;
	};
