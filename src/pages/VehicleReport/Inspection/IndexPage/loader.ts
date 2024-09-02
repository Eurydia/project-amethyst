import {
	getVehicleReportInspectionAll,
	getVehicle,
} from "$backend/database/get";
import {
	VehicleModel,
	VehicleReportInspectionEntry,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { LoaderFunction } from "react-router-dom";

const getInspectionRoundNumber = (
	reports: VehicleReportInspectionModel[],
	currentReport: VehicleReportInspectionModel,
	vehicle: VehicleModel,
) => {
	let count = 0;
	for (const report of reports) {
		if (report.vehicle_id === vehicle.id) {
			count++;
		}
		if (report.id === currentReport.id) {
			break;
		}
	}
	return count.toString();
};

const toEntry = async (
	reportAll: VehicleReportInspectionModel[],
	report: VehicleReportInspectionModel,
	vehicle: VehicleModel,
) => {
	const inspectionRoundNumber =
		getInspectionRoundNumber(
			reportAll,
			report,
			vehicle,
		);

	const entry: VehicleReportInspectionEntry = {
		id: report.id,
		inspectionRoundNumber,
		datetime: report.datetime,
		topics: report.topics.split(","),
		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,
	};
	return entry;
};

export type IndexPageLoaderData = {
	entries: VehicleReportInspectionEntry[];
};
export const indexPageLoader: LoaderFunction =
	async () => {
		const reports =
			await getVehicleReportInspectionAll();

		const entries: VehicleReportInspectionEntry[] =
			[];
		for (const report of reports) {
			const vehicle = await getVehicle(report.id);
			if (vehicle === null) {
				continue;
			}
			const entry = await toEntry(
				reports,
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
