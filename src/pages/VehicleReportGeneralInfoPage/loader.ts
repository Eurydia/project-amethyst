/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportGeneral } from "$backend/database/get/vehicle-general-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  BAD_REQUEST_ERROR,
  VEHICLE_MISSING_FROM_DATABASE_ERROR,
  VEHICLE_REPORT_GENERAL_MISSING_FROM_DATABASE_ERROR,
} from "$core/errors";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralModel } from "$types/models/vehicle-report-general";
import { LoaderFunction } from "react-router-dom";

export type VehicleReportGeneralInfoPageLoaderData = {
  report: VehicleReportGeneralModel;
  vehicle: VehicleModel;
  topicComboBoxOptions: string[];
};
export const vehicleReportGeneralInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.reportId === undefined) {
      throw BAD_REQUEST_ERROR;
    }
    const reportId = Number.parseInt(params.reportId);
    const report = await tauriGetVehicleReportGeneral(
      reportId
    );
    if (report === null) {
      throw VEHICLE_REPORT_GENERAL_MISSING_FROM_DATABASE_ERROR;
    }
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      throw VEHICLE_MISSING_FROM_DATABASE_ERROR;
    }
    const topicComboBoxOptions = await tauriGetTopicAll();

    const loaderData: VehicleReportGeneralInfoPageLoaderData =
      {
        report,
        vehicle,
        topicComboBoxOptions,
      };

    return loaderData;
  };
