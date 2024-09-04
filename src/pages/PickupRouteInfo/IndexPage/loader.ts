import {
	getDriverAll,
	getOperationLogAll,
	getPickupRoute,
	getPickupRouteReportGeneralAll,
	getVehicleAll,
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

const reportToEntries = (
	reportAll: PickupRouteReportModel[],
	route: PickupRouteModel,
) => {
	const entries = [];
	for (const report of reportAll) {
		if (report.route_id !== route.id) {
			continue;
		}
		const entry = reportToEntry(report, route);
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
	route: PickupRouteModel,
	vehicleAll: VehicleModel[],
	driverAll: DriverModel[],
) => {
	const entries = [];
	for (const log of logAll) {
		const vehicle = vehicleAll.find(
			({ id }) => id === log.vehicle_id,
		);
		if (vehicle === undefined) {
			continue;
		}
		const driver = driverAll.find(
			({ id }) => id === log.driver_id,
		);
		if (driver === undefined) {
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
		const route = await getPickupRoute(
			Number.parseInt(routeId),
		);
		if (route === null) {
			throw json(
				{
					message:
						TRANSLATION.pickupRouteIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}
		const reportAll =
			await getPickupRouteReportGeneralAll();
		const reportEntries = reportToEntries(
			reportAll,
			route,
		);

		const vehicleAll = await getVehicleAll();
		const driverAll = await getDriverAll();
		const logAll = await getOperationLogAll();
		const logEntries = logToEntries(
			logAll,
			route,
			vehicleAll,
			driverAll,
		);
		const loaderData: IndexPageLoaderData = {
			route,
			logEntries,
			generalEntries: reportEntries,
		};

		return loaderData;
	};
