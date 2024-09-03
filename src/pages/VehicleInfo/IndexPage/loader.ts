import {
	getDriver,
	getOperationLogAll,
	getPickupRoute,
	getVehicle,
	getVehicleReportGeneralAll,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/Driver";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import {
	VehicleModel,
	VehicleReportGeneralEntry,
	VehicleReportGeneralModel,
	VehicleReportInspectionEntry,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import {
	BaseDirectory,
	readDir,
} from "@tauri-apps/api/fs";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

const inspectionToEntry = (
	reports: VehicleReportInspectionModel[],
	currReport: VehicleReportInspectionModel,
	vehicle: VehicleModel,
) => {
	let count = 0;
	for (const report of reports) {
		if (report.vehicle_id === vehicle.id) {
			count++;
		}
		if (report.id === currReport.id) {
			break;
		}
	}
	const entry: VehicleReportInspectionEntry = {
		inspectionRoundNumber: count.toString(),
		datetime: currReport.datetime,
		id: currReport.id,
		topics: currReport.topics.split(","),
		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,
	};
	return entry;
};

const reportToEntry = (
	report: VehicleReportGeneralModel,
	vehicle: VehicleModel,
) => {
	const entry: VehicleReportGeneralEntry = {
		datetime: report.datetime,
		id: report.id,
		title: report.title,
		topics: report.topics.split(","),
		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,
	};
	return entry;
};

const logToEntry = async (
	report: OperationalLogModel,
	vehicle: VehicleModel,
	driver: DriverModel,
	route: PickupRouteModel,
) => {
	const entry: OperationalLogEntry = {
		id: report.id,
		startDate: report.start_date,
		endDate: report.end_date,

		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,

		driverId: report.driver_id,
		driverName: driver.name,
		driverSurname: driver.surname,

		routeId: report.route_id,
		routeName: route.name,
	};
	return entry;
};

const getImages = async (vehicleId: string) => {
	const dirPath = await join(
		"vehicles",
		vehicleId,
		"images",
	);
	const files = await readDir(dirPath, {
		dir: BaseDirectory.AppData,
	});

	const images: {
		src: string;
		fileName: string;
	}[] = [];
	for (const file of files) {
		if (file.name === undefined) {
			continue;
		}
		images.push({
			fileName: file.name,
			src: convertFileSrc(file.path),
		});
	}
	return images;
};

export type IndexPageLoaderData = {
	images: { fileName: string; src: string }[];
	vehicle: VehicleModel;
	generalEntries: VehicleReportGeneralEntry[];
	inspectionEntries: VehicleReportInspectionEntry[];
	logEntries: OperationalLogEntry[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const generalReports =
			await getVehicleReportGeneralAll();
		const generalEntries: VehicleReportGeneralEntry[] =
			[];
		for (const report of generalReports) {
			if (report.vehicle_id !== vehicle.id) {
				continue;
			}
			const entry = reportToEntry(
				report,
				vehicle,
			);
			generalEntries.push(entry);
		}

		const inspectionReports =
			await getVehicleReportInspectionAll();
		const inspectionEntries: VehicleReportInspectionEntry[] =
			[];
		for (const report of inspectionReports) {
			if (report.vehicle_id !== vehicle.id) {
				continue;
			}
			const entry = inspectionToEntry(
				inspectionReports,
				report,
				vehicle,
			);
			inspectionEntries.push(entry);
		}

		const logs = await getOperationLogAll();
		const logEntries: OperationalLogEntry[] = [];
		for (const log of logs) {
			if (log.vehicle_id !== vehicle.id) {
				continue;
			}
			const driver = await getDriver(
				log.driver_id,
			);
			if (driver === null) {
				continue;
			}
			const route = await getPickupRoute(
				log.route_id,
			);
			if (route === null) {
				continue;
			}
			const entry = await logToEntry(
				log,
				vehicle,
				driver,
				route,
			);
			logEntries.push(entry);
		}
		const images = await getImages(vehicle.id);
		const loaderData: IndexPageLoaderData = {
			vehicle,
			images,
			logEntries,
			generalEntries,
			inspectionEntries,
		};

		return loaderData;
	};
