import {
	getVehicleReportGeneralAll,
	getVehicle,
} from "$backend/database/get";
import { VehicleReportGeneralEntry } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: VehicleReportGeneralEntry[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const rawEntries =
			await getVehicleReportGeneralAll();

		const entryRequests = rawEntries.map(
			async (rawEntry) => {
				const vehicle = await getVehicle(
					rawEntry.id,
				);
				if (vehicle === null) {
					return null;
				}

				const entry: VehicleReportGeneralEntry = {
					id: rawEntry.id,
					topics: rawEntry.topics.split(","),
					datetime: rawEntry.datetime,
					title: rawEntry.title,
					vehicleId: vehicle.id,
					vehicleLicensePlate:
						vehicle.license_plate,
				};

				return entry;
			},
		);
		const entries = (
			await Promise.all(entryRequests)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
