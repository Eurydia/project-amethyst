import {
	getDriverAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
	initFormData: OperationalLogFormData;
	vehicleOptions: VehicleModel[];
	driverOptions: DriverModel[];
	routeOptions: PickupRouteModel[];
};
export const newPageLoader: LoaderFunction =
	async () => {
		const driverOptions = await getDriverAll();
		const vehicleOptions = await getVehicleAll();
		const routeOptions =
			await getPickupRouteAll();
		const initFormData: OperationalLogFormData = {
			startDate: "",
			endDate: "",
			driver: null,
			route: null,
			vehicle: null,
		};
		const loaderData: NewPageLoaderData = {
			initFormData,
			driverOptions,
			vehicleOptions,
			routeOptions,
		};
		return loaderData;
	};
