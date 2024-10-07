/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportInspection } from "$backend/database/get/vehicle-inspection-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  BadRequestError,
  VehicleMissingFromDatabaseError,
  VehicleReportInspectionMissingFromDatabaseError,
} from "$core/errors";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { LoaderFunction } from "react-router-dom";

export type VehicleReportInspectionInfoPageLoaderData = {
  report: VehicleReportInspectionModel;
  vehicle: VehicleModel;
  topicComboBoxOptions: string[];
};
export const vehicleReportInspectionInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.reportId === undefined) {
      throw BadRequestError();
    }
    const reportId = parseInt(params.reportId);
    const report = await tauriGetVehicleReportInspection(
      reportId
    );
    if (report === null) {
      throw VehicleReportInspectionMissingFromDatabaseError();
    }
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      throw VehicleMissingFromDatabaseError();
    }

    const topicComboBoxOptions = await tauriGetTopicAll();

    const loaderData: VehicleReportInspectionInfoPageLoaderData =
      {
        report,
        topicComboBoxOptions,
        vehicle,
      };

    return loaderData;
  };
