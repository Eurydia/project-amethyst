import {
	getDriver,
	getOperationLogAll,
	getPickupRoute,
	getPickupRouteReportGeneralAll,
	getVehicle,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/Driver";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";
import {
	PickupRouteModel,
	PickupRouteReportEntry,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

const reportToEntry = (
	report: PickupRouteReportModel,
	route: PickupRouteModel,
) => {
	const entry: PickupRouteReportEntry = {
		datetime: report.datetime,
		id: report.id,
		title: report.title,
		topics: report.topics.split(","),

		routeId: route.id,
		routeName: route.name,
	};
	return entry;
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

		driverId: log.driver_id,
		driverName: driver.name,
		driverSurname: driver.surname,

		routeId: log.route_id,
		routeName: route.name,
	};
	return entry;
};

export type IndexPageLoaderData = {
	route: PickupRouteModel;
	logEntries: OperationalLogEntry[];
	generalEntries: PickupRouteReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { routeId } = params;
		if (routeId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const route = await getPickupRoute(routeId);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const generalReports =
			await getPickupRouteReportGeneralAll();
		const generalEntries: PickupRouteReportEntry[] =
			[];
		for (const report of generalReports) {
			if (report.id !== routeId) {
				continue;
			}
			const entry = reportToEntry(report, route);
			generalEntries.push(entry);
		}

		const logs = await getOperationLogAll();
		const logEntries: OperationalLogEntry[] = [];
		for (const log of logs) {
			if (log.route_id !== routeId) {
				continue;
			}
			const driver = await getDriver(
				log.driver_id,
			);
			if (driver === null) {
				continue;
			}
			const vehicle = await getVehicle(
				log.vehicle_id,
			);
			if (vehicle === null) {
				continue;
			}
			const entry = logToEntry(
				log,
				vehicle,
				driver,
				route,
			);
			logEntries.push(entry);
		}
		const loaderData: IndexPageLoaderData = {
			route,
			logEntries,
			generalEntries,
		};

		return loaderData;
	};
