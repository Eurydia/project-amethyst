import { tauriGetDriverAll } from "$backend/database/get/drivers";
import { tauriGetOperationalLogAll } from "$backend/database/get/operational-logs";
import { tauriGetPickupRouteAll } from "$backend/database/get/pickup-routes";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportGeneralAll } from "$backend/database/get/vehicle-general-reports";
import { tauriGetVehicleReportInspectionAll } from "$backend/database/get/vehicle-inspection-reports";
import { tauriGetVehicleVendorAll } from "$backend/database/get/vehicle-vendors";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  BadRequestError,
  VehicleMissingFromDatabaseError,
} from "$core/errors";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general";
import { VEHICLE_REPORT_INSPECTION_TRANSFORMER } from "$core/transformers/vehicle-report-inspection";
import { DriverModel } from "$types/models/driver";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralEntry } from "$types/models/vehicle-report-general";
import { VehicleReportInspectionEntry } from "$types/models/vehicle-report-inspection";
import { fs } from "@tauri-apps/api";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import {
  appLocalDataDir,
  join,
} from "@tauri-apps/api/path";
import { LoaderFunction } from "react-router-dom";

export type VehicleInfoPageLoaderData = {
  galleryFileEntries: FileEntry[];
  galleryDirPath: string;

  vehicle: VehicleModel;
  generalEntries: VehicleReportGeneralEntry[];
  inspectionEntries: VehicleReportInspectionEntry[];
  logEntries: OperationalLogEntry[];

  vendorComboBoxOptions: string[];
  topicComboBoxOptions: string[];
  driverSelectOptions: DriverModel[];
  routeSelectOptions: PickupRouteModel[];
};
export const vehicleInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.vehicleId === undefined) {
      throw BadRequestError();
    }
    const vehicleId = Number.parseInt(params.vehicleId);
    const vehicle = await tauriGetVehicle(vehicleId);
    if (vehicle === null) {
      throw VehicleMissingFromDatabaseError();
    }

    const logs = (await tauriGetOperationalLogAll())
      .filter(({ vehicle_id }) => vehicle_id === vehicleId)
      .map(OPERATIONAL_LOG_MODEL_TRANSFORMER.toEntry);
    const generalReports = (
      await tauriGetVehicleReportGeneralAll()
    )
      .filter(({ vehicle_id }) => vehicle_id === vehicleId)
      .map(
        VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toEntry
      );
    const inspectionReports = (
      await tauriGetVehicleReportInspectionAll()
    )
      .filter(({ vehicle_id }) => vehicle_id === vehicleId)
      .map(VEHICLE_REPORT_INSPECTION_TRANSFORMER.toEntry);

    const logEntries = (await Promise.all(logs)).filter(
      (entry) => entry !== null
    );
    const generalEntries = (
      await Promise.all(generalReports)
    ).filter((entry) => entry !== null);
    const inspectionEntries = (
      await Promise.all(inspectionReports)
    ).filter((entry) => entry !== null);

    // Gallery
    const galleryDirPath = await join(
      await appLocalDataDir(),
      "assets",
      "vehicles",
      vehicleId.toString(),
      "images"
    );
    await fs.createDir(galleryDirPath, {
      recursive: true,
    });
    const galleryFileEntries = await readDir(
      galleryDirPath,
      {
        recursive: false,
      }
    );

    const vendorComboBoxOptions =
      await tauriGetVehicleVendorAll();
    const driverSelectOptions = await tauriGetDriverAll();
    const routeSelectOptions =
      await tauriGetPickupRouteAll();
    const topicComboBoxOptions = await tauriGetTopicAll();
    const loaderData: VehicleInfoPageLoaderData = {
      vehicle,

      logEntries,
      generalEntries,
      inspectionEntries,

      galleryDirPath,
      galleryFileEntries,

      vendorComboBoxOptions,
      driverSelectOptions,
      routeSelectOptions,
      topicComboBoxOptions,
    };

    return loaderData;
  };
