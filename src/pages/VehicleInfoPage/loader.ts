import {
  getDriverAll,
  getOperationLogAll,
  getPickupRouteAll,
  getTopicAll,
  getVehicle,
  getVehicleReportGeneralAll,
  getVehicleReportInspectionAll,
  getVehicleVendorAll,
} from "$backend/database/get";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general-model";
import { VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-inspection-model";
import { TRANSLATION } from "$locale/th";
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
import { json, LoaderFunction } from "react-router-dom";

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
      throw json(
        {},
        {
          status: 400,
          statusText:
            TRANSLATION.vehicleIdIsMissingFromParams,
        },
      );
    }
    const vehicleId = Number.parseInt(params.vehicleId);
    const vehicle = await getVehicle(vehicleId);
    if (vehicle === null) {
      throw json(
        {},
        {
          status: 404,
          statusText:
            TRANSLATION.errorVehicleIsMissingFromDatabase,
        },
      );
    }

    const logs = (await getOperationLogAll())
      .filter(({ vehicle_id }) => vehicle_id === vehicleId)
      .map(
        OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
      );
    const generalReports = (
      await getVehicleReportGeneralAll()
    )
      .filter(({ vehicle_id }) => vehicle_id === vehicleId)
      .map(
        VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toVehicleReportGeneralEntry,
      );
    const inspectionReports = (
      await getVehicleReportInspectionAll()
    )
      .filter(({ vehicle_id }) => vehicle_id === vehicleId)
      .map(
        VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER.toVehicleReportInspectionEntry,
      );

    const logEntries = (await Promise.all(logs)).filter(
      (entry) => entry !== null,
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

    const vendorComboBoxOptions =
      await getVehicleVendorAll();
    const driverSelectOptions = await getDriverAll();
    const routeSelectOptions = await getPickupRouteAll();
    const topicComboBoxOptions = await getTopicAll();
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
