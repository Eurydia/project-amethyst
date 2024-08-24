import {
	getDriverMedicalReportAllWithDriverId,
	getDriverGeneralReportAllWithDriverId,
	getDriverWithId,
	getVehicleWithId,
} from "$backend/database/get";
import {
	DriverModel,
	DriverReportModel,
	VehicleModel,
} from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverInfoPageLoaderData = {
	driverData: DriverModel;
	vehicleData: VehicleModel | null;
	driverGeneralReportEntries: DriverReportModel[];
	driverMedicalReportEntries: DriverReportModel[];
};

export const driverInfoPageLoader: LoaderFunction =
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
		const driverGeneralReportEntries =
			await getDriverGeneralReportAllWithDriverId(
				driverId,
			);
		const driverMedicalReportEntries =
			await getDriverMedicalReportAllWithDriverId(
				driverId,
			);

		const loaderData: DriverInfoPageLoaderData = {
			driverData,
			vehicleData,
			driverGeneralReportEntries,
			driverMedicalReportEntries,
		};

		return loaderData;
	};
