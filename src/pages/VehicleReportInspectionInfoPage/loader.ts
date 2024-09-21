import {
  getVehicleReportInspection,
  getVehicleReportInspectionAll
} from "$backend/database/get/vehicle-inspection-reports";
import { getVehicle } from "$backend/database/get/vehicles";
import { getTopicAll } from "$backend/database/get/topics";
import { TRANSLATION } from "$locale/th";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { json, LoaderFunction } from "react-router-dom";

export type VehicleReportInspectionInfoPageLoaderData = {
  report: VehicleReportInspectionModel;
  vehicle: VehicleModel;
  inspectionRoundNumber: number;
  topicComboBoxOptions: string[];
};
export const vehicleReportInspectionInfoPageLoader: LoaderFunction =
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
    const reportId = parseInt(params.reportId);
    const report = await getVehicleReportInspection(
      reportId,
    );
    if (report === null) {
      throw json(
        {},
        {
          status: 404,
          statusText:
            TRANSLATION.vehicleInspectionReportIsMissingFromDatabase,
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
    const reports = (await getVehicleReportInspectionAll())
      .filter(({ vehicle_id }) => vehicle_id === vehicle.id)
      .toReversed();
    let inspectionRoundNumber = 0;
    for (const { id } of reports) {
      inspectionRoundNumber++;
      if (id === report.id) {
        break;
      }
    }

    const loaderData: VehicleReportInspectionInfoPageLoaderData =
      {
        report,
        inspectionRoundNumber,
        topicComboBoxOptions,
        vehicle,
      };

    return loaderData;
  };
