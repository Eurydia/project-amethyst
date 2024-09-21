import { getDriverReportGeneral } from "$backend/database/get/driver-general-reports";
import { getDriver } from "$backend/database/get/drivers";
import { getTopicAll } from "$backend/database/get/topics";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/driver";
import { DriverReportModel } from "$types/models/driver-report";
import { json, LoaderFunction } from "react-router-dom";

export type DriverReportGeneralInfoPageLoaderData = {
  report: DriverReportModel;
  driver: DriverModel;
  topicComboBoxOptions: string[];
};
export const driverReportGeneralInfoPageLoader: LoaderFunction = async ({
  params,
}) => {
  if (params.reportId === undefined) {
    throw json(
      {},
      {
        status: 400,
        statusText: TRANSLATION.driverReportIdIsMissingFromParams,
      }
    );
  }
  const reportId = Number.parseInt(params.reportId);
  const report = await getDriverReportGeneral(reportId);
  if (report === null) {
    throw json(
      {},
      {
        status: 404,
        statusText: TRANSLATION.driverGeneralReportIsMissingFromDatabase,
      }
    );
  }
  const driver = await getDriver(report.driver_id);
  if (driver === null) {
    throw json(
      {
        message: TRANSLATION.errorDriverIsMissingFromDatabase,
      },
      { status: 404 }
    );
  }

  const topicComboBoxOptions = await getTopicAll();

  const loaderData: DriverReportGeneralInfoPageLoaderData = {
    report,
    driver,
    topicComboBoxOptions,
  };

  return loaderData;
};
