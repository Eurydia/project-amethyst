import {
	getDriver,
	getDriverReportGeneralAll,
	getDriverReportMedicalAll,
	getOperationLogAll,
	getPickupRouteAll,
	getVehicleAll,
} from "$backend/database/get";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report-model";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
import { TRANSLATION } from "$locale/th";
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
	databaseHasNoRoute: boolean;
	databaseHasNoVehicle: boolean;
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
			.map(
				DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
			);

		const generalReports = (
			await getDriverReportGeneralAll()
		)
			.filter(
				({ driver_id }) => driver_id === driverId,
			)
			.map(
				DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
			);

		const medicalEntries = (
			await Promise.all(medicalReports)
		).filter((entry) => entry !== null);

		const generalEntries = (
			await Promise.all(generalReports)
		).filter((entry) => entry !== null);

		const vehicles = await getVehicleAll();
		const routes = await getPickupRouteAll();

		const databaseHasNoVehicle =
			vehicles.length === 0;
		const databaseHasNoRoute =
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
			.map(
				OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
			);

		const logEntries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);

		const loaderData: IndexPageLoaderData = {
			databaseHasNoRoute,
			databaseHasNoVehicle,

			driver,
			logEntries,
			galleryDirPath,
			galleryFileEntries,

			generalEntries,
			medicalEntries,
		};
		return loaderData;
	};
