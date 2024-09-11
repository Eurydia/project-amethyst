import {
	getDriverAll,
	getOperationLogToday,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import { DriverEntry } from "$types/models/Driver";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	driverEntries: DriverEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const drivers = (await getDriverAll()).map(
			async (driver) => {
				const logs = await getOperationLogToday();

				const routeIds = new Set<number>();
				const vehicleIds = new Set<number>();
				for (const log of logs) {
					if (log.driver_id !== driver.id) {
						continue;
					}
					routeIds.add(log.route_id);
					vehicleIds.add(log.vehicle_id);
				}

				const vehicles = (
					await Promise.all(
						[...vehicleIds].map(getVehicle),
					)
				)
					.filter((vehicle) => vehicle !== null)
					.map(({ id, license_plate }) => ({
						id,
						licensePlate: license_plate,
					}));

				const routes = (
					await Promise.all(
						[...routeIds].map(getPickupRoute),
					)
				)
					.filter((route) => route !== null)
					.map(({ id, name }) => ({
						id,
						name,
					}));

				const entry: DriverEntry = {
					id: driver.id,
					name: driver.name,
					surname: driver.surname,
					routes,
					vehicles,
				};
				return entry;
			},
		);

		const driverEntries = (
			await Promise.all(drivers)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			driverEntries,
		};
		return loaderData;
	};
