import {
	getDriver,
	getDriverAll,
	getPickupRoute,
	getPickupRouteAll,
	getVehicle,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/driver";
import { OperationalLogFormData } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type NewPageLoaderData = {
	selectedRoute: PickupRouteModel | null;
	selectedVehicle: VehicleModel | null;
	selectedDriver: DriverModel | null;
	initFormData: OperationalLogFormData;
	driverSelectOptions: DriverModel[];
	vehicleSelectOptions: VehicleModel[];
	routeSelectOptions: PickupRouteModel[];
};
export const newPageLoader: LoaderFunction =
	async ({ request }) => {
		const url = new URL(request.url);
		const queryDriverId =
			url.searchParams.get("driverId");
		const queryVehicleId =
			url.searchParams.get("vehicleId");
		const queryRouteId =
			url.searchParams.get("routeId");

		let driverSelectOptions: DriverModel[] = [];
		let driver: DriverModel | null = null;
		let selectedDriver: DriverModel | null = null;

		let vehicleSelectOptions: VehicleModel[] = [];
		let vehicle: VehicleModel | null = null;
		let selectedVehicle: VehicleModel | null =
			null;

		let routeSelectOptions: PickupRouteModel[] =
			[];
		let route: PickupRouteModel | null = null;
		let selectedRoute: PickupRouteModel | null =
			null;

		if (queryDriverId !== null) {
			driver = await getDriver(
				Number.parseInt(queryDriverId),
			);
			if (driver === null) {
				throw json(
					{},
					{
						status: 404,
						statusText:
							TRANSLATION.errorDriverIsMissingFromDatabase,
					},
				);
			}
			selectedDriver = driver;
			driverSelectOptions = [driver];
		} else {
			driverSelectOptions = await getDriverAll();
			if (driverSelectOptions.length === 0) {
				throw json(
					{},
					{
						status: 404,
						statusText:
							TRANSLATION.errorNoDriverInDatabase,
					},
				);
			}
			driver = driverSelectOptions[0];
		}

		if (queryVehicleId !== null) {
			vehicle = await getVehicle(
				Number.parseInt(queryVehicleId),
			);
			if (vehicle === null) {
				throw json(
					{},
					{
						status: 404,
						statusText:
							TRANSLATION.errorVehicleIsMissingFromDatabase,
					},
				);
			}
			selectedVehicle = vehicle;
			vehicleSelectOptions = [vehicle];
		} else {
			vehicleSelectOptions =
				await getVehicleAll();
			if (vehicleSelectOptions.length === 0) {
				throw json(
					{},
					{
						status: 404,
						statusText:
							TRANSLATION.errorNoVehicleInDatabase,
					},
				);
			}
			vehicle = vehicleSelectOptions[0];
		}

		if (queryRouteId !== null) {
			route = await getPickupRoute(
				Number.parseInt(queryRouteId),
			);
			if (route === null) {
				throw json(
					{},
					{
						status: 404,
						statusText:
							TRANSLATION.errorDriverIsMissingFromDatabase,
					},
				);
			}
			selectedRoute = route;
			routeSelectOptions = [route];
		} else {
			routeSelectOptions =
				await getPickupRouteAll();
			if (routeSelectOptions.length === 0) {
				throw json(
					{},
					{
						status: 404,
						statusText:
							TRANSLATION.errorNoPickupRouteInDatabase,
					},
				);
			}
			route = routeSelectOptions[0];
		}

		const initFormData: OperationalLogFormData = {
			startDate: dayjs()
				.startOf("month")
				.format(),
			endDate: dayjs().endOf("month").format(),
			driver,
			route,
			vehicle,
		};
		const loaderData: NewPageLoaderData = {
			selectedDriver,
			selectedRoute,
			selectedVehicle,
			initFormData,
			driverSelectOptions,
			vehicleSelectOptions,
			routeSelectOptions,
		};
		return loaderData;
	};
