import {
	getVehicleAll,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportInspectionEntry,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const toEntry = (
	reportAll: VehicleReportInspectionModel[],
	report: VehicleReportInspectionModel,
	vehicle: VehicleModel,
) => {
	let count = 0;
	for (const { vehicle_id, id } of reportAll) {
		if (vehicle_id === vehicle.id) {
			count++;
		}
		if (id === report.id) {
			break;
		}
	}

	const entry: VehicleReportInspectionEntry = {
		inspectionRoundNumber: count.toString(),
		id: report.id,
		datetime: report.datetime,
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
	reportAll: VehicleReportInspectionModel[],
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
		const entry = toEntry(
			reportAll,
			report,
			vehicle,
		);
		entries.push(entry);
	}
	return entries;
};

export type IndexPageLoaderData = {
	entries: VehicleReportInspectionEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reportAll =
			await getVehicleReportInspectionAll();
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
