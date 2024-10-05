import { tauriGetDriverReportGeneral } from "$backend/database/get/driver-general-reports";
import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import {
  BadRequestError,
  DriverMissingFromDatabaseError,
  DriverReportGeneralMissingFromDatabaseError,
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
      throw BadRequestError();
    }
    const reportId = Number.parseInt(params.reportId);
    const report = await tauriGetDriverReportGeneral(
      reportId
    );
    if (report === null) {
      throw DriverReportGeneralMissingFromDatabaseError;
    }
    const driver = await tauriGetDriver(report.driver_id);
    if (driver === null) {
      throw DriverMissingFromDatabaseError();
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
