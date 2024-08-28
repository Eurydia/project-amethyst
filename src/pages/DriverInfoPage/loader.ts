import {
	getDriverGeneralReportAllWithDriverId,
	getDriverMedicalReportAllWithDriverId,
	getDriverWithId,
	getTopicAll,
} from "$backend/database/get";
import { DriverReport } from "$types/form-data";
import {
	DriverModel,
	DriverReportModel,
} from "$types/models";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type DriverInfoPageLoaderData = {
	driver: DriverModel;
	topicOptions: string[];
	driverOptions: string[];
	generalReportEntries: DriverReport[];
	medicalReportEntries: DriverReport[];
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

		const driverOptions = [
			`${driver.name} ${driver.surname}`,
		];
		const topicOptions = await getTopicAll();
		const rawGeneralReportEntries =
			await getDriverGeneralReportAllWithDriverId(
				driverId,
			);
		const rawMedicalReportEntries =
			await getDriverMedicalReportAllWithDriverId(
				driverId,
			);
		const entryMapper = (
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
		const generalReportEntries =
			rawGeneralReportEntries.map(entryMapper);
		const medicalReportEntries =
			rawMedicalReportEntries.map(entryMapper);
		const loaderData: DriverInfoPageLoaderData = {
			topicOptions,
			driverOptions,
			driver,
			generalReportEntries,
			medicalReportEntries,
		};

		return loaderData;
	};
