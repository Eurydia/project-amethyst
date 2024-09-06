import {
	getDriverAll,
	getOperationLogAll,
	getPickupRouteAll,
	getTopicAll,
	getVehicle,
	getVehicleReportGeneralAll,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { MultiSelectOption } from "$types/generics";
import { DriverModelImpl } from "$types/impl/Driver";
import { OperationalLogModelImpl } from "$types/impl/OperationalLog";
import { PickupRouteModelImpl } from "$types/impl/PickupRoute";
import {
	VehicleModelImpl,
	VehicleReportGeneralModelImpl,
	VehicleReportInspectionModelImpl,
} from "$types/impl/Vehicle";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import {
	VehicleModel,
	VehicleReportGeneralEntry,
	VehicleReportInspectionEntry,
} from "$types/models/Vehicle";
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
	galleryFileEntries: FileEntry[];
	galleryDirPath: string;

	vehicle: VehicleModel;
	generalEntries: VehicleReportGeneralEntry[];
	inspectionEntries: VehicleReportInspectionEntry[];
	logEntries: OperationalLogEntry[];

	topicMultiSelectOptions: MultiSelectOption[];
	driverMultiSelectOptions: MultiSelectOption[];
	vehicleMultiSelectOptions: MultiSelectOption[];
	routeMultiSelectOptions: MultiSelectOption[];
};
export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		if (params.vehicleId === undefined) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIdIsMissingFromParams,
				},
				{ status: 400 },
			);
		}
		const vehicleId = Number.parseInt(
			params.vehicleId,
		);
		const vehicle = await getVehicle(vehicleId);
		if (vehicle === null) {
			throw json(
				{
					message:
						TRANSLATION.vehicleIsMissingFromDatabase,
				},
				{ status: 404 },
			);
		}

		const logs = (await getOperationLogAll())
			.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicleId,
			)
			.map(OperationalLogModelImpl.toEntry);

		const generalReports = (
			await getVehicleReportGeneralAll()
		)
			.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicleId,
			)
			.map(VehicleReportGeneralModelImpl.toEntry);

		const inspectionReports = (
			await getVehicleReportInspectionAll()
		)
			.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicleId,
			)
			.map(
				VehicleReportInspectionModelImpl.toEntry,
			);

		const logEntries = (
			await Promise.all(logs)
		).filter((entry) => entry !== null);
		const generalEntries = (
			await Promise.all(generalReports)
		).filter((entry) => entry !== null);
		const inspectionEntries = (
			await Promise.all(inspectionReports)
		).filter((entry) => entry !== null);

		const driverMultiSelectOptions = (
			await getDriverAll()
		).map(DriverModelImpl.toMultiSelectOption);
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
		const vehicleMultiSelectOptions = [
			VehicleModelImpl.toMultiSelectOption(
				vehicle,
			),
		];

		const galleryDirPath = await join(
			await appLocalDataDir(),
			"vehicles",
			vehicleId.toString(),
			"images",
		);
		const galleryFileEntries = await readDir(
			await join(
				"vehicles",
				vehicleId.toString(),
				"images",
			),
			{
				dir: BaseDirectory.AppLocalData,
				recursive: false,
			},
		);

		const loaderData: IndexPageLoaderData = {
			vehicle,
			logEntries,
			generalEntries,
			inspectionEntries,
			driverMultiSelectOptions,
			routeMultiSelectOptions,
			vehicleMultiSelectOptions,
			topicMultiSelectOptions,
			galleryDirPath,
			galleryFileEntries,
		};

		return loaderData;
	};
