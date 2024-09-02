import {
	getVehicleReportGeneralAll,
	getVehicle,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportGeneralEntry,
	VehicleReportGeneralModel,
} from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = async (
	report: VehicleReportGeneralModel,
	vehicle: VehicleModel,
) => {
	const entry: VehicleReportGeneralEntry = {
		id: report.id,
		datetime: report.datetime,
		title: report.title,
		topics: report.topics.split(","),

		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,
	};

	return entry;
};

export type IndexPageLoaderData = {
	entries: VehicleReportGeneralEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports =
			await getVehicleReportGeneralAll();

		const entries: VehicleReportGeneralEntry[] =
			[];
		for (const report of reports) {
			const vehicle = await getVehicle(
				report.vehicle_id,
			);
			if (vehicle === null) {
				continue;
			}
			const entry = await toEntry(
				report,
				vehicle,
			);

			entries.push(entry);
		}
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
