import {
  getDriverAll,
  getDriverReportMedicalAll,
} from "$backend/database/get";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report-model";
import { DriverReportEntry } from "$types/models/driver-report";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
  databaseHasNoDriver: boolean;
  reportEntries: DriverReportEntry[];
};
export const indexPageLoader: LoaderFunction = async () => {
  const reports = (await getDriverReportMedicalAll()).map(
    DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
  );

  const reportEntries = (await Promise.all(reports)).filter(
    (entry) => entry !== null,
  );

  const drivers = await getDriverAll();
  const databaseHasNoDriver = drivers.length === 0;

  const loaderData: IndexPageLoaderData = {
    databaseHasNoDriver,
    reportEntries,
  };
  return loaderData;
};
