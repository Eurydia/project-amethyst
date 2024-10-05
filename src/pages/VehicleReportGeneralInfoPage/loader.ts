/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportGeneral } from "$backend/database/get/vehicle-general-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  BadRequestError,
  VehicleMissingFromDatabaseError,
  VehicleReportGeneralMissingFromDatabaseError,
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
      throw BadRequestError();
    }
    const reportId = Number.parseInt(params.reportId);
    const report = await tauriGetVehicleReportGeneral(
      reportId
    );
    if (report === null) {
      throw VehicleReportGeneralMissingFromDatabaseError();
    }
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      throw VehicleMissingFromDatabaseError();
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
