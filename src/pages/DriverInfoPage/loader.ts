import {
	getDriverGeneralReportAllWithDriverId,
	getDriverMedicalReportAllWithDriverId,
	getDriverWithId,
	getOperationLogWithDriverId,
	getTopicAll,
} from "$backend/database/get";
import {
	DriverReport,
	OperationalLog,
} from "$types/models";
import {
	DriverModel,
	DriverReportModel,
	OperationalLogModel,
} from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverInfoPageLoaderData = {
	topicOptions: string[];
	driverOptions: string[];
	driver: DriverModel;
	generalReportEntries: DriverReport[];
	medicalReportEntries: DriverReport[];
	operationalLogEntries: OperationalLog[];
};

export const driverInfoPageLoader: LoaderFunction =
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
					...rawEntry,
					driver_name: driver.name,
					driver_surname: driver.surname,
					vehicle_license_plate: "123456",
					route_name: "123432432",
				};
				return entry;
			});

		const topicOptions = await getTopicAll();
		const driverOptions = [
			`${driver.name} ${driver.surname}`,
		];

		const loaderData: DriverInfoPageLoaderData = {
			driverOptions,
			topicOptions,
			driver,
			operationalLogEntries,
			generalReportEntries,
			medicalReportEntries,
		};

		return loaderData;
	};
