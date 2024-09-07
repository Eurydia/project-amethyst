import {
	getDriver,
	getDriverReportGeneralAll,
	getDriverReportMedicalAll,
	getOperationLogAll,
	getPickupRouteAll,
	getTopicAll,
	getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { MultiSelectOption } from "$types/generics";
import {
	DriverModelImpl,
	DriverReportModelImpl,
} from "$types/impl/Driver";
import { OperationalLogModelImpl } from "$types/impl/OperationalLog";
import { PickupRouteModelImpl } from "$types/impl/PickupRoute";
import { VehicleModelImpl } from "$types/impl/Vehicle";
import {
	DriverModel,
	DriverReportEntry,
} from "$types/models/Driver";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import { fs } from "@tauri-apps/api";
import {
	BaseDirectory,
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
	driver: DriverModel;
	galleryDirPath: string;
	galleryFileEntries: FileEntry[];
	logEntries: OperationalLogEntry[];
	generalEntries: DriverReportEntry[];
	medicalEntries: DriverReportEntry[];
	driverMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
	routeMultiSelectOptions: MultiSelectOption[];
	topicMultiSelectOptions: MultiSelectOption[];
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

		const vehicleMultiSelectOptions = (
			await getVehicleAll()
		).map(VehicleModelImpl.toMultiSelectOption);

		const routeMultiSelectOptions = (
			await getPickupRouteAll()
		).map(
			PickupRouteModelImpl.toMultiSelectOption,
		);
		const topicMultiSelectOptions: MultiSelectOption[] =
			(await getTopicAll()).map((topic) => ({
				label: topic,
				value: topic,
			}));

		const driverMultiSelectOptions = [
			DriverModelImpl.toMultiSelectOption(driver),
		];

		const dirPath = await join(
			"drivers",
			driverId.toString(),
			"images",
		);
		await fs.createDir(dirPath, {
			dir: BaseDirectory.AppLocalData,
			recursive: true,
		});
		const galleryFileEntries = await readDir(
			await join(
				"drivers",
				driverId.toString(),
				"images",
			),
			{
				dir: BaseDirectory.AppLocalData,
				recursive: false,
			},
		);
		const galleryDirPath = await join(
			await appLocalDataDir(),
			dirPath,
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
			driver,
			logEntries,
			galleryDirPath,
			galleryFileEntries,

			topicMultiSelectOptions,

			vehicleMultiSelectOptions,
			routeMultiSelectOptions,
			driverMultiSelectOptions,

			generalEntries,
			medicalEntries,
		};
		return loaderData;
	};
