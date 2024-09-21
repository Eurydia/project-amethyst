import { getDriverReportGeneralAll } from "$backend/database/get/driver-general-reports";
import { getDriverAll } from "$backend/database/get/drivers";
import { getTopicAll } from "$backend/database/get/topics";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report-model";
import { DriverModel } from "$types/models/driver";
import { DriverReportEntry } from "$types/models/driver-report";
import { LoaderFunction } from "react-router-dom";

export type DriverReportGeneralIndexPageLoaderData = {
  reportEntries: DriverReportEntry[];
  driverSelectOptions: DriverModel[];
  topicComboBoxOptions: string[];
};
export const driverReportGeneralIndexPageLoader: LoaderFunction = async () => {
  const reports = (await getDriverReportGeneralAll()).map(
    DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry
  );

  const reportEntries = (await Promise.all(reports)).filter(
    (entry) => entry !== null
  );

  const driverSelectOptions = await getDriverAll();
  const topicComboBoxOptions = await getTopicAll();

  const loaderData: DriverReportGeneralIndexPageLoaderData = {
    reportEntries,
    driverSelectOptions,
    topicComboBoxOptions,
  };
  return loaderData;
};
