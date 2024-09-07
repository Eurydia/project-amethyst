import {
	getAttendanceLogToday,
	getDriverAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { MultiSelectOption } from "$types/generics";
import { AttendanceLogModelImpl } from "$types/impl/AttendanceLog";
import { DriverModelImpl } from "$types/impl/Driver";
import { PickupRouteModelImpl } from "$types/impl/PickupRoute";
import { VehicleModelImpl } from "$types/impl/Vehicle";
import { AttendanceLogEntry } from "$types/models/AttendanceLog";
import { LoaderFunction } from "react-router-dom";

export type HomePageLoaderData = {
	entries: AttendanceLogEntry[];
	driverMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
	routeMultiSelectOptions: MultiSelectOption[];
};
export const homePageLoader: LoaderFunction =
	async () => {
		const driverMultiSelectOptions = (
			await getDriverAll()
		).map(DriverModelImpl.toMultiSelectOption);

		const vehicleMultiSelectOptions = (
			await getVehicleAll()
		).map(VehicleModelImpl.toMultiSelectOption);

		const routeMultiSelectOptions = (
			await getPickupRouteAll()
		).map(
			PickupRouteModelImpl.toMultiSelectOption,
		);
		const logs = (
			await getAttendanceLogToday()
		).map(AttendanceLogModelImpl.toEntry);

		const entries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);

		const loaderData: HomePageLoaderData = {
			entries,
			driverMultiSelectOptions,
			routeMultiSelectOptions,
			vehicleMultiSelectOptions,
		};
		return loaderData;
	};
