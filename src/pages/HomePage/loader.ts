import {
	getAttendanceLogToday,
	getDriverAll,
	getOperationLogToday,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { AttendanceLogModel } from "$types/models/AttendanceLog";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type HomePageLoaderData = {
	operationalLogs: OperationalLogModel[];
	attendanceLogs: AttendanceLogModel[];
	drivers: DriverModel[];
	vehicles: VehicleModel[];
	routes: PickupRouteModel[];
};
export const homePageLoader: LoaderFunction =
	async () => {
		const operationalLogs =
			await getOperationLogToday();
		const attendanceLogs =
			await getAttendanceLogToday();

		const drivers = await getDriverAll();
		const vehicles = await getVehicleAll();
		const routes = await getPickupRouteAll();

		const loaderData: HomePageLoaderData = {
			operationalLogs,
			attendanceLogs,
			drivers,
			vehicles,
			routes,
		};
		return loaderData;
	};
