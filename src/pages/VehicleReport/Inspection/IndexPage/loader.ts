import {
  getVehicleAll,
  getVehicleReportInspectionAll,
} from "$backend/database/get";
import { VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-inspection-model";
import { VehicleReportInspectionEntry } from "$types/models/vehicle-report-inspection";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
  databaseHasNoVehicle: boolean;
  reportEntries: VehicleReportInspectionEntry[];
};
export const indexPageLoader: LoaderFunction = async () => {
  const reports = (
    await getVehicleReportInspectionAll()
  ).map(
    VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER.toVehicleReportInspectionEntry,
  );
  const reportEntries = (await Promise.all(reports)).filter(
    (entry) => entry !== null,
  );
  const vehicles = await getVehicleAll();
  const databaseHasNoVehicle = vehicles.length === 0;

  const loaderData: IndexPageLoaderData = {
    databaseHasNoVehicle,
    reportEntries,
  };
  return loaderData;
};
