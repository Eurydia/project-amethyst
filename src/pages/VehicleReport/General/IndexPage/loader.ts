import {
	getVehicleAll,
	getVehicleReportGeneralAll,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportGeneralEntry,
	VehicleReportGeneralModel,
} from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	report: VehicleReportGeneralModel,
	vehicle: VehicleModel,
) => {
	const entry: VehicleReportGeneralEntry = {
		id: report.id,
		datetime: report.datetime,
		title: report.title,
		topics: report.topics
			.normalize()
			.split(",")
			.map((topic) => topic.trim())
			.filter((topic) => topic.length > 0),

		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,
	};

	return entry;
};

const toEntries = (
	reportAll: VehicleReportGeneralModel[],
	vehicleAll: VehicleModel[],
) => {
	const entries = [];
	for (const report of reportAll) {
		const vehicle = vehicleAll.find(
			({ id }) => id === report.vehicle_id,
		);
		if (vehicle === undefined) {
			continue;
		}
		const entry = toEntry(report, vehicle);
		entries.push(entry);
	}
	return entries;
};
export type IndexPageLoaderData = {
	entries: VehicleReportGeneralEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reportAll =
			await getVehicleReportGeneralAll();
		const vehicleAll = await getVehicleAll();
		const entries = toEntries(
			reportAll,
			vehicleAll,
		);
		const loaderData: IndexPageLoaderData = {
			entries,
		};
		return loaderData;
	};
