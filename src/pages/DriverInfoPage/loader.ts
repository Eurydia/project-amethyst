import {
  getDriver,
  getDriverReportGeneralAll,
  getDriverReportMedicalAll,
  getOperationLogAll,
  getPickupRouteAll,
  getTopicAll,
  getVehicleAll,
} from "$backend/database/get";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report-model";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/driver";
import { DriverReportEntry } from "$types/models/driver-report";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { fs } from "@tauri-apps/api";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import {
  appLocalDataDir,
  join,
} from "@tauri-apps/api/path";
import { json, LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
  driver: DriverModel;
  galleryDirPath: string;
  galleryFileEntries: FileEntry[];

  vehicleSelectOptions: VehicleModel[];
  routeSelectOptions: PickupRouteModel[];

  logEntries: OperationalLogEntry[];
  generalEntries: DriverReportEntry[];
  medicalEntries: DriverReportEntry[];
  topicComboBoxOptions: string[];
};
export const driverInfoPageLoader: LoaderFunction = async ({
  params,
}) => {
  if (params.driverId === undefined) {
    throw json(
      {},
      {
        status: 400,
        statusText: TRANSLATION.driverIdIsMissingFromParams,
      },
    );
  }
  const driverId = Number.parseInt(params.driverId);
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

  const medicalReports = (await getDriverReportMedicalAll())
    .filter(({ driver_id }) => driver_id === driverId)
    .map(
      DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
    );
  const generalReports = (await getDriverReportGeneralAll())
    .filter(({ driver_id }) => driver_id === driverId)
    .map(
      DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
    );

  const medicalEntries = (
    await Promise.all(medicalReports)
  ).filter((entry) => entry !== null);

  const generalEntries = (
    await Promise.all(generalReports)
  ).filter((entry) => entry !== null);

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
  const galleryFileEntries = await readDir(galleryDirPath, {
    recursive: false,
  });

  const logs = (await getOperationLogAll())
    .filter(({ driver_id }) => driver_id === driverId)
    .map(
      OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
    );

  const logEntries = (await Promise.all(logs)).filter(
    (entry) => entry !== null,
  );

  const vehicleSelectOptions = await getVehicleAll();
  const routeSelectOptions = await getPickupRouteAll();
  const topicComboBoxOptions = await getTopicAll();

  const loaderData: IndexPageLoaderData = {
    driver,
    galleryDirPath,
    galleryFileEntries,

    logEntries,
    generalEntries,
    medicalEntries,

    routeSelectOptions,
    vehicleSelectOptions,
    topicComboBoxOptions,
  };
  return loaderData;
};
