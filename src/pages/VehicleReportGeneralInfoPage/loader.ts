import { getVehicleReportGeneral } from "$backend/database/get/vehicle-general-reports";
import { getVehicle } from "$backend/database/get/vehicles";
import { getTopicAll } from "$backend/database/get/topics";
import { TRANSLATION } from "$locale/th";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralModel } from "$types/models/vehicle-report-general";
import { json, LoaderFunction } from "react-router-dom";

export type VehicleReportGeneralInfoPageLoaderData = {
  report: VehicleReportGeneralModel;
  vehicle: VehicleModel;
  topicComboBoxOptions: string[];
};
export const vehicleReportGeneralInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.reportId === undefined) {
      throw json(
        {},
        {
          status: 400,
          statusText:
            TRANSLATION.vehicleReportIdIsMissingFromParams,
        },
      );
    }
    const reportId = Number.parseInt(params.reportId);
    const report = await getVehicleReportGeneral(reportId);
    if (report === null) {
      throw json(
        {},
        {
          status: 404,
          statusText:
            TRANSLATION.vehicleGeneralReportIsMissingFromDatabase,
        },
      );
    }
    const vehicle = await getVehicle(report.vehicle_id);
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
    const topicComboBoxOptions = await getTopicAll();

    const loaderData: VehicleReportGeneralInfoPageLoaderData =
      {
        report,
        vehicle,
        topicComboBoxOptions,
      };

    return loaderData;
  };
