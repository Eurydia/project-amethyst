import { tauriGetDriverReportGeneral } from "$backend/database/get/driver-general-reports";
import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import {
  BAD_REQUEST_ERROR,
  DRIVER_MISSING_FROM_DATABASE_ERROR,
  DRIVER_REPORT_GENERAL_MISSING_FROM_DATABASE_ERROR,
} from "$core/errors";
import { DriverModel } from "$types/models/driver";
import { DriverReportModel } from "$types/models/driver-report";
import { LoaderFunction } from "react-router-dom";

export type DriverReportGeneralInfoPageLoaderData = {
  report: DriverReportModel;
  driver: DriverModel;
  topicComboBoxOptions: string[];
};
export const driverReportGeneralInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.reportId === undefined) {
      throw BAD_REQUEST_ERROR;
    }
    const reportId = Number.parseInt(params.reportId);
    const report = await tauriGetDriverReportGeneral(
      reportId
    );
    if (report === null) {
      throw DRIVER_REPORT_GENERAL_MISSING_FROM_DATABASE_ERROR;
    }
    const driver = await tauriGetDriver(report.driver_id);
    if (driver === null) {
      throw DRIVER_MISSING_FROM_DATABASE_ERROR;
    }

    const topicComboBoxOptions = await tauriGetTopicAll();

    const loaderData: DriverReportGeneralInfoPageLoaderData =
      {
        report,
        driver,
        topicComboBoxOptions,
      };

    return loaderData;
  };
