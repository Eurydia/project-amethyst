import {
  getDriverAll,
  getDriverReportGeneralAll,
  getTopicAll,
} from "$backend/database/get";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report-model";
import { DriverModel } from "$types/models/driver";
import { DriverReportEntry } from "$types/models/driver-report";
import { LoaderFunction } from "react-router-dom";

export type DriverReportMedicalIndexPageLoaderData = {
  reportEntries: DriverReportEntry[];
  driverSelectOptions: DriverModel[];
  topicComboBoxOptions: string[];
};
export const driverReportMedicalIndexPageLoader: LoaderFunction =
  async () => {
    const reports = (await getDriverReportGeneralAll()).map(
      DRIVER_REPORT_MODEL_TRANSFORMER.toDriverReportEntry,
    );

    const reportEntries = (
      await Promise.all(reports)
    ).filter((entry) => entry !== null);

    const driverSelectOptions = await getDriverAll();
    const topicComboBoxOptions = await getTopicAll();

    const loaderData: DriverReportMedicalIndexPageLoaderData =
      {
        reportEntries,
        driverSelectOptions,
        topicComboBoxOptions,
      };
    return loaderData;
  };
