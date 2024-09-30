/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportInspectionAll } from "$backend/database/get/vehicle-inspection-reports";
import { tauriGetVehicleAll } from "$backend/database/get/vehicles";
import { VEHICLE_REPORT_INSPECTION_TRANSFORMER } from "$core/transformers/vehicle-report-inspection-model";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionEntry } from "$types/models/vehicle-report-inspection";
import { LoaderFunction } from "react-router-dom";

export type VehicleReportInspectionIndexPageLoaderData = {
  topicComboBoxOptions: string[];
  vehicleSelectOptions: VehicleModel[];
  reportEntries: VehicleReportInspectionEntry[];
};
export const vehicleReportInspectionIndexPageLoader: LoaderFunction =
  async () => {
    const reports = (
      await tauriGetVehicleReportInspectionAll()
    ).map(VEHICLE_REPORT_INSPECTION_TRANSFORMER.toEntry);
    const reportEntries = (
      await Promise.all(reports)
    ).filter((entry) => entry !== null);
    const vehicleSelectOptions = await tauriGetVehicleAll();
    const topicComboBoxOptions = await tauriGetTopicAll();
    const loaderData: VehicleReportInspectionIndexPageLoaderData =
      {
        topicComboBoxOptions,
        vehicleSelectOptions,
        reportEntries,
      };
    return loaderData;
  };
