import {
	getVehicleReportInspectionAll,
	getVehicle,
} from "$backend/database/get";
import { VehicleReportInspectionEntry } from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
	entries: VehicleReportInspectionEntry[];
};

export const indexPageLoader: LoaderFunction =
	async () => {
		const rawEntries =
			await getVehicleReportInspectionAll();

		const entryRequests = rawEntries.map(
			async (rawEntry) => {
				const vehicle = await getVehicle(
					rawEntry.id,
				);
				if (vehicle === null) {
					return null;
				}

				const entry: VehicleReportInspectionEntry =
					{
						vehicleId: vehicle.id,
						vehicleLicensePlate:
							vehicle.license_plate,
						inspectionRoundNumber:
							rawEntry.inspection_round_number,
						topics: rawEntry.topics.split(","),
						datetime: rawEntry.datetime,
						id: rawEntry.id,
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
