import {
	getDriverGeneralReportAllWithDriverId,
	getDriverMedicalReportAllWithDriverId,
	getDriverWithId,
	getOperationLogWithDriverId,
} from "$backend/database/get";
import { OperationalLog } from "$types/models";
import {
	DriverModel,
	DriverReport,
	DriverReportModel,
} from "$types/DriverModel";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type IndexPageLoaderData = {
	driver: DriverModel;
	generalReportEntries: DriverReport[];
	medicalReportEntries: DriverReport[];
	operationalLogEntries: OperationalLog[];
};

export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { driverId } = params;
		if (driverId === undefined) {
			throw json(
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}

		const driver = await getDriverWithId(
			driverId,
		);

		if (driver === null) {
			throw json(
				{ message: "ไม่พบคนขับรถในระบบ" },
				{ status: 404 },
			);
		}
		const mapper = (
			rawEntry: DriverReportModel,
		) => {
			const entry: DriverReport = {
				...rawEntry,
				driver_name: driver.name,
				driver_surname: driver.surname,
				topics: rawEntry.topics.split(","),
			};
			return entry;
		};
		const generalReportEntries = (
			await getDriverGeneralReportAllWithDriverId(
				driverId,
			)
		).map(mapper);
		const medicalReportEntries = (
			await getDriverMedicalReportAllWithDriverId(
				driverId,
			)
		).map(mapper);

		const operationalLogEntries: OperationalLog[] =
			(
				await getOperationLogWithDriverId(
					driver.id,
				)
			).map((rawEntry) => {
				const entry: OperationalLog = {
					endDate: rawEntry.start_date,
					startDate: rawEntry.start_date,
					id: rawEntry.id,
					routeId: rawEntry.route_id,
					vehicleId: rawEntry.vehicle_id,
					driverId: driver.id,
					driverName: driver.name,
					driverSurname: driver.surname,
					vehiclePlate: "123456",
					routeName: "123432432",
				};
				return entry;
			});

		const loaderData: IndexPageLoaderData = {
			driver,
			operationalLogEntries,
			generalReportEntries,
			medicalReportEntries,
		};

		return loaderData;
	};
