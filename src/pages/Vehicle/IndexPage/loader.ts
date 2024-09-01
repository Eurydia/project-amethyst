import {
	getDriverWithId,
	getOperationLogAll,
	getPickupRouteWithId,
	getVehicleAll,
} from "$backend/database/get";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: {
		id: string;
		licensePlate: string;
		vendor: string;
		registeredCity: string;
		drivers: {
			id: string;
			name: string;
			surname: string;
		}[];
		routes: { id: string; name: string }[];
	}[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const vehicles = await getVehicleAll();

		const now = dayjs();
		const opLogs = (await getOperationLogAll())
			.filter(({ start_date }) =>
				now.isAfter(dayjs(start_date)),
			)
			.filter(({ end_date }) =>
				now.isBefore(dayjs(end_date)),
			);

		// Slight optimization: Fetch all vehicle data in parallel
		const entryReqs = vehicles.map(
			async (vehicle) => {
				const logs = opLogs.filter(
					({ vehicle_id }) =>
						vehicle_id === vehicle.id,
				);

				const driverSet = new Set(
					logs.map(({ driver_id }) => driver_id),
				);
				const routeSet = new Set(
					logs.map(({ route_id }) => route_id),
				);

				const driverReqs = [...driverSet].map(
					async (id) => getDriverWithId(id),
				);

				const routeReqs = [...routeSet].map(
					async (id) => getPickupRouteWithId(id),
				);

				const drivers: IndexPageLoaderData["entries"][number]["drivers"] =
					(await Promise.all(driverReqs))
						.filter((driver) => driver !== null)
						.map(({ id, name, surname }) => ({
							id,
							name,
							surname,
						}));

				const routes: IndexPageLoaderData["entries"][number]["routes"] =
					(await Promise.all(routeReqs))
						.filter((route) => route !== null)
						.map(({ id, name }) => ({
							id,
							name,
						}));

				return {
					id: vehicle.id,
					vendor: vehicle.vendor,
					licensePlate: vehicle.license_plate,
					registeredCity: vehicle.registered_city,
					routes,
					drivers,
				} as IndexPageLoaderData["entries"][number];
			},
		);

		const entries = await Promise.all(entryReqs);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
