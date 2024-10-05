/** @format */

import { tauriGetDriverReportGeneralAll } from "$backend/database/get/driver-general-reports";
import { tauriGetDriverReportMedicalAll } from "$backend/database/get/driver-medical-reports";
import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetOperationalLogAll } from "$backend/database/get/operational-logs";
import { tauriGetPickupRouteAll } from "$backend/database/get/pickup-routes";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleAll } from "$backend/database/get/vehicles";
import {
  BadRequestError,
  DriverMissingFromDatabaseError,
} from "$core/errors";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log";
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
import { LoaderFunction } from "react-router-dom";

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
    throw BadRequestError();
  }
  const driverId = Number.parseInt(params.driverId);
  const driver = await tauriGetDriver(driverId);
  if (driver === null) {
    throw DriverMissingFromDatabaseError;
  }

  const medicalReports = (
    await tauriGetDriverReportMedicalAll()
  )
    .filter(({ driver_id }) => driver_id === driverId)
    .map(DRIVER_REPORT_MODEL_TRANSFORMER.toEntry);
  const generalReports = (
    await tauriGetDriverReportGeneralAll()
  )
    .filter(({ driver_id }) => driver_id === driverId)
    .map(DRIVER_REPORT_MODEL_TRANSFORMER.toEntry);

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
    "images"
  );
  await fs.createDir(galleryDirPath, {
    recursive: true,
  });
  const galleryFileEntries = await readDir(galleryDirPath, {
    recursive: false,
  });

  const logs = (await tauriGetOperationalLogAll())
    .filter(({ driver_id }) => driver_id === driverId)
    .map(OPERATIONAL_LOG_MODEL_TRANSFORMER.toEntry);

  const logEntries = (await Promise.all(logs)).filter(
    (entry) => entry !== null
  );

  const vehicleSelectOptions = await tauriGetVehicleAll();
  const routeSelectOptions = await tauriGetPickupRouteAll();
  const topicComboBoxOptions = await tauriGetTopicAll();

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
