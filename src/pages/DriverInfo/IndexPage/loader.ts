import {
	getDriver,
	getDriverReportGeneralAll,
	getDriverReportMedicalAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { DriverReportModelImpl } from "$types/impl/Driver";
import { OperationalLogModelImpl } from "$types/impl/OperationalLog";
import {
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import { fs } from "@tauri-apps/api";
import {
	FileEntry,
	readDir,
} from "@tauri-apps/api/fs";
import {
	appLocalDataDir,
	join,
} from "@tauri-apps/api/path";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type IndexPageLoaderData = {
	databaseIsMissingRoute: boolean;
	databaseIsMissingVehicle: boolean;
	driver: DriverModel;
	galleryDirPath: string;
	galleryFileEntries: FileEntry[];
	logEntries: OperationalLogEntry[];
	generalEntries: DriverReportEntry[];
	medicalEntries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.driverId === undefined) {
			throw json(
				{},
				{
					status: 400,
					statusText:
						TRANSLATION.driverIdIsMissingFromParams,
				},
			);
		}
		const driverId = Number.parseInt(
			params.driverId,
		);
		const driver = await getDriver(driverId);
		if (driver === null) {
			throw json(
				{},
				{
					status: 404,
					statusText:
						TRANSLATION.errorDriverIsMissingFromDatabase,
				},
			);
		}

		const medicalReports = (
			await getDriverReportMedicalAll()
		)
			.filter(
				({ driver_id }) => driver_id === driverId,
			)
			.map(DriverReportModelImpl.toEntry);

		const generalReports = (
			await getDriverReportGeneralAll()
		)
			.filter(
				({ driver_id }) => driver_id === driverId,
			)
			.map(DriverReportModelImpl.toEntry);

		const medicalEntries = (
			await Promise.all(medicalReports)
		).filter((entry) => entry !== null);

		const generalEntries = (
			await Promise.all(generalReports)
		).filter((entry) => entry !== null);

		const vehicles = await getVehicleAll();
		const routes = await getPickupRouteAll();

		const databaseIsMissingVehicle =
			vehicles.length === 0;
		const databaseIsMissingRoute =
			routes.length === 0;

		const galleryDirPath = await join(
			await appLocalDataDir(),
			"assets",
			"drivers",
			driverId.toString(),
			"images",
		);
		await fs.createDir(galleryDirPath, {
			recursive: true,
		});
		const galleryFileEntries = await readDir(
			galleryDirPath,
			{
				recursive: false,
			},
		);

		const logs = (await getOperationLogAll())
			.filter(
				({ driver_id }) => driver_id === driverId,
			)
			.map(OperationalLogModelImpl.toEntry);

		const logEntries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			databaseIsMissingRoute,
			databaseIsMissingVehicle,

			driver,
			logEntries,
			galleryDirPath,
			galleryFileEntries,

			generalEntries,
			medicalEntries,
		};
		return loaderData;
	};
