import {
	getDriverWithId,
	getVehicleWithId,
} from "$backend/database/get";
import {
	DriverModel,
	VehicleModel,
} from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverPageLoaderData = {
	driverData: DriverModel;
	vehicleData: VehicleModel | null;
};

export const driverPageLoader: LoaderFunction =
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

		const vehicleData = await getVehicleWithId(
			driverData.current_vehicle_id,
		);

		const loaderData: DriverPageLoaderData = {
			driverData,
			vehicleData,
		};

		return loaderData;
	};
