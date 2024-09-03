import {
	getDriver,
	getDriverReportMedicalAll,
	getOperationLogAll,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import {
	DriverModel,
	DriverReportEntry,
	DriverReportModel,
} from "$types/models/Driver";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
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

const reportToEntry = (
	report: DriverReportModel,
	driver: DriverModel,
) => {
	const entry: DriverReportEntry = {
		datetime: report.datetime,
		id: report.id,
		title: report.title,
		topics: report.topics.split(","),

		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,
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

const getImages = async (driverId: string) => {
	const dirPath = await join(
		"drivers",
		driverId,
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
	driver: DriverModel;
	images: {
		src: string;
		fileName: string;
	}[];
	generalEntries: DriverReportEntry[];
	medicalEntries: DriverReportEntry[];
	logEntries: OperationalLogEntry[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{
					message:
						TRANSLATION.driverIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const medicalReports =
			await getDriverReportMedicalAll();
		const medicalEntries: DriverReportEntry[] =
			[];
		for (const report of medicalReports) {
			if (report.driver_id !== driverId) {
				continue;
			}
			const entry = reportToEntry(report, driver);
			medicalEntries.push(entry);
		}
		const generalReports =
			await getDriverReportMedicalAll();
		const generalEntries: DriverReportEntry[] =
			[];
		for (const report of generalReports) {
			if (report.driver_id !== driverId) {
				continue;
			}
			const entry = reportToEntry(report, driver);
			generalEntries.push(entry);
		}

		const logs = await getOperationLogAll();
		const logEntries: OperationalLogEntry[] = [];
		for (const log of logs) {
			if (log.driver_id !== driverId) {
				continue;
			}
			const vehicle = await getVehicle(
				log.vehicle_id,
			);
			if (vehicle === null) {
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

		const images = await getImages(driverId);

		const loaderData: IndexPageLoaderData = {
			driver,
			images,
			logEntries,
			generalEntries,
			medicalEntries,
		};
		return loaderData;
	};
