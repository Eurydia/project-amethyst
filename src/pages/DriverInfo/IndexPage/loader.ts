import { getDriver } from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/Driver";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

// const reportToEntry = (
// 	report: DriverReportModel,
// 	driver: DriverModel,
// ) => {
// 	const entry: DriverReportEntry = {
// 		datetime: report.datetime,
// 		id: report.id,
// 		title: report.title,
// 		topics: report.topics.split(","),

// 		driverId: driver.id,
// 		driverName: driver.name,
// 		driverSurname: driver.surname,
// 	};
// 	return entry;
// };

// const reportToEntries = (
// 	reports: DriverReportModel[],
// 	driver: DriverModel,
// ) => {
// 	const generalEntries: DriverReportEntry[] = [];
// 	for (const report of reports) {
// 		if (report.driver_id !== driver.id) {
// 			continue;
// 		}
// 		const entry = reportToEntry(report, driver);
// 		generalEntries.push(entry);
// 	}
// 	return generalEntries;
// };

// const logToEntry = (
// 	log: OperationalLogModel,
// 	vehicle: VehicleModel,
// 	driver: DriverModel,
// 	route: PickupRouteModel,
// ) => {
// 	const entry: OperationalLogEntry = {
// 		id: log.id,
// 		startDate: log.start_date,
// 		endDate: log.end_date,

// 		vehicleId: vehicle.id,
// 		vehicleLicensePlate: vehicle.license_plate,

// 		driverId: driver.id,
// 		driverName: driver.name,
// 		driverSurname: driver.surname,

// 		routeId: route.id,
// 		routeName: route.name,
// 	};
// 	return entry;
// };

// const logToEntries = async (
// 	logAll: OperationalLogModel[],
// 	driver: DriverModel,
// 	vehicleAll: VehicleModel[],
// 	routeAll: PickupRouteModel[],
// ): Promise<OperationalLogEntry[]> => {
// 	const logEntries: OperationalLogEntry[] = [];
// 	for (const log of logAll) {
// 		if (log.driver_id !== driver.id) {
// 			continue;
// 		}
// 		const vehicle = vehicleAll.find(
// 			({ id }) => id === log.vehicle_id,
// 		);
// 		if (vehicle === undefined) {
// 			continue;
// 		}
// 		const route = routeAll.find(
// 			({ id }) => id === log.route_id,
// 		);
// 		if (route === undefined) {
// 			continue;
// 		}
// 		const entry = logToEntry(
// 			log,
// 			vehicle,
// 			driver,
// 			route,
// 		);
// 		logEntries.push(entry);
// 	}
// 	return logEntries;
// };

export type IndexPageLoaderData = {
	// shouldDisableOperationalLogPost: boolean;
	driver: DriverModel;
	// generalEntries: DriverReportEntry[];
	// medicalEntries: DriverReportEntry[];
	// logEntries: OperationalLogEntry[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.driverId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.driverIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const driverId = Number.parseInt(
			params.driverId,
		);

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

		// const medicalReportAll =
		// 	await getDriverReportMedicalAll();
		// const medicalEntries = reportToEntries(
		// 	medicalReportAll,
		// 	driver,
		// );

		// const generalReportAll =
		// 	await getDriverReportGeneralAll();
		// const generalEntries = reportToEntries(
		// 	generalReportAll,
		// 	driver,
		// );

		// const logs = await getOperationLogAll();
		// const vehicleAll = await getVehicleAll();
		// const routeAll = await getPickupRouteAll();
		// const logEntries = await logToEntries(
		// 	logs,
		// 	driver,
		// 	vehicleAll,
		// 	routeAll,
		// );
		// const shouldDisableOperationalLogPost =
		// 	vehicleAll.length === 0 ||
		// 	routeAll.length === 0;

		// const images = await getImages(driverId);

		const loaderData: IndexPageLoaderData = {
			// shouldDisableOperationalLogPost,
			driver,
			// images,
			// logEntries,
			// generalEntries,
			// medicalEntries,
		};
		return loaderData;
	};
