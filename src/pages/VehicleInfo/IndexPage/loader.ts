import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
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
	json,
	LoaderFunction,
} from "react-router-dom";

const inspectionToEntry = (
	inspectionAll: VehicleReportInspectionModel[],
	inspection: VehicleReportInspectionModel,
	vehicle: VehicleModel,
) => {
	let count = 0;
	for (const report of inspectionAll) {
		if (report.vehicle_id === vehicle.id) {
			count++;
		}
		if (report.id === inspection.id) {
			break;
		}
	}
	const entry: VehicleReportInspectionEntry = {
		inspectionRoundNumber: count,

		datetime: inspection.datetime,
		id: inspection.id,
		topics: inspection.topics.split(","),

		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,
	};
	return entry;
};

const inspectionToEntries = (
	inspectionAll: VehicleReportInspectionModel[],
	vehicle: VehicleModel,
) => {
	const inspectionEntries = [];
	for (const report of inspectionAll) {
		if (report.vehicle_id !== vehicle.id) {
			continue;
		}
		const entry = inspectionToEntry(
			inspectionAll,
			report,
			vehicle,
		);
		inspectionEntries.push(entry);
	}
	return inspectionEntries;
};

const reportToEntry = (
	report: VehicleReportGeneralModel,
	vehicle: VehicleModel,
) => {
	const entry: VehicleReportGeneralEntry = {
		datetime: report.datetime,
		id: report.id,
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

const reportToEntries = (
	reportAll: VehicleReportGeneralModel[],
	vehicle: VehicleModel,
) => {
	const entries = [];
	for (const report of reportAll) {
		const entry = reportToEntry(report, vehicle);
		entries.push(entry);
	}
	return entries;
};

const logToEntry = (
	log: OperationalLogModel,
	vehicle: VehicleModel,
	driver: DriverModel,
	route: PickupRouteModel,
) => {
	const entry: OperationalLogEntry = {
		id: log.id,
		startDate: log.start_date,
		endDate: log.end_date,

		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,

		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,

		routeId: route.id,
		routeName: route.name,
	};
	return entry;
};

const logToEntries = (
	logAll: OperationalLogModel[],
	vehicle: VehicleModel,
	driverAll: DriverModel[],
	routeAll: PickupRouteModel[],
) => {
	const entries = [];
	for (const log of logAll) {
		if (log.vehicle_id !== vehicle.id) {
			continue;
		}

		const driver = driverAll.find(
			({ id }) => id === log.driver_id,
		);
		if (driver === undefined) {
			continue;
		}
		const route = routeAll.find(
			({ id }) => id === log.route_id,
		);
		if (route === undefined) {
			continue;
		}
		const entry = logToEntry(
			log,
			vehicle,
			driver,
			route,
		);
		entries.push(entry);
	}
	return entries;
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
		const vehicle = await getVehicle(
			Number.parseInt(vehicleId),
		);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const reports =
			await getVehicleReportGeneralAll();
		const reportEntries = reportToEntries(
			reports,
			vehicle,
		);

		const inspections =
			await getVehicleReportInspectionAll();
		const inspectionEntries = inspectionToEntries(
			inspections,
			vehicle,
		);

		const drivers = await getDriverAll();
		const routes = await getPickupRouteAll();
		const logs = await getOperationLogAll();
		const logEntries = logToEntries(
			logs,
			vehicle,
			drivers,
			routes,
		);

		const images = await getImages(vehicle.id);
		const loaderData: IndexPageLoaderData = {
			vehicle,
			images,
			logEntries,
			generalEntries: reportEntries,
			inspectionEntries,
		};

		return loaderData;
	};
