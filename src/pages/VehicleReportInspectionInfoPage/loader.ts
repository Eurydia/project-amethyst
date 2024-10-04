/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import {
  tauriGetVehicleReportInspection,
  tauriGetVehicleReportInspectionAll,
} from "$backend/database/get/vehicle-inspection-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  BAD_REQUEST_ERROR,
  VEHICLE_MISSING_FROM_DATABASE_ERROR,
  VEHICLE_REPORT_INSPECTION_MISSING_FROM_DATABASE_ERROR,
} from "$core/errors";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { LoaderFunction } from "react-router-dom";

export type VehicleReportInspectionInfoPageLoaderData = {
  report: VehicleReportInspectionModel;
  vehicle: VehicleModel;
  inspectionRoundNumber: number;
  topicComboBoxOptions: string[];
};
export const vehicleReportInspectionInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.reportId === undefined) {
      throw BAD_REQUEST_ERROR;
    }
    const reportId = parseInt(params.reportId);
    const report = await tauriGetVehicleReportInspection(
      reportId
    );
    if (report === null) {
      throw VEHICLE_REPORT_INSPECTION_MISSING_FROM_DATABASE_ERROR;
    }
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      throw VEHICLE_MISSING_FROM_DATABASE_ERROR;
    }

    const topicComboBoxOptions = await tauriGetTopicAll();
    const reports = (
      await tauriGetVehicleReportInspectionAll()
    )
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
