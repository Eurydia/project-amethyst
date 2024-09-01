import {
	getDriver,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicle,
} from "$backend/database/get";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: {
		id: string;
		name: string;
		vehicles: {
			id: string;
			plate: string;
		}[];
		drivers: {
			id: string;
			name: string;
			surname: string;
		}[];
	}[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const routes = await getPickupRouteAll();
		const operationalLogs =
			await getOperationLogAll();

		// Slight optimization: Fetch all vehicle data in parallel
		const requests: Promise<
			IndexPageLoaderData["entries"][number]
		>[] = routes.map(async (route) => {
			const logs = operationalLogs.filter(
				(log) => log.route_id === route.id,
			);

			const vehicleSet = new Set(
				logs.map(({ vehicle_id }) => vehicle_id),
			);
			const driverSet = new Set(
				logs.map(({ driver_id }) => driver_id),
			);

			const vehicleRequests = [...vehicleSet].map(
				async (id) => getVehicle(id),
			);

			const routeRequets = [...driverSet].map(
				async (id) => getDriver(id),
			);

			const vehicles: IndexPageLoaderData["entries"][number]["vehicles"] =
				(await Promise.all(vehicleRequests))
					.filter((vehicle) => vehicle !== null)
					.map(({ id, license_plate }) => ({
						id: id,
						plate: license_plate,
					}));

			const drivers: IndexPageLoaderData["entries"][number]["drivers"] =
				(await Promise.all(routeRequets))
					.filter((driver) => driver !== null)
					.map(({ id, name, surname }) => ({
						id,
						name,
						surname,
					}));

			return {
				id: route.id,
				name: route.name,
				vehicles,
				drivers,
			};
		});

		const entries = await Promise.all(requests);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
