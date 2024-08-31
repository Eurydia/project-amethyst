import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteWithId,
	getVehicleWithId,
} from "$backend/database/get";
import { DriverModel } from "$types/models";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: {
		id: string;
		name: string;
		surname: string;
		contact: string;
		vehicles: {
			id: string;
			licensePlate: string;
		}[];
		routes: { id: string; name: string }[];
	}[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const drivers: DriverModel[] =
			await getDriverAll();

		const operationalLogs =
			await getOperationLogAll();

		// Slight optimization: Fetch all vehicle data in parallel
		const entryRequests: Promise<
			IndexPageLoaderData["entries"][number]
		>[] = drivers.map(async (driver) => {
			const logs = operationalLogs.filter(
				(log) => log.driver_id === driver.id,
			);

			const vehicleSet = new Set(
				logs.map(({ vehicle_id }) => vehicle_id),
			);
			const routeSet = new Set(
				logs.map(({ route_id }) => route_id),
			);

			const vehicleRequests = Array.from(
				vehicleSet,
			).map(async (id) => getVehicleWithId(id));

			const routeRequets = Array.from(
				routeSet,
			).map(async (id) =>
				getPickupRouteWithId(id),
			);

			const vehicles: IndexPageLoaderData["entries"][number]["vehicles"] =
				(await Promise.all(vehicleRequests))
					.filter((vehicle) => vehicle !== null)
					.map((vehicle) => ({
						id: vehicle.id,
						licensePlate: vehicle.license_plate,
					}));

			const routes = (
				await Promise.all(routeRequets)
			)
				.filter((route) => route !== null)
				.map((route) => ({
					id: route.id,
					name: route.name,
				}));

			return {
				id: driver.id,
				name: driver.name,
				surname: driver.surname,
				contact: driver.contact,
				vehicles,
				routes,
			};
		});

		const entries = await Promise.all(
			entryRequests,
		);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
