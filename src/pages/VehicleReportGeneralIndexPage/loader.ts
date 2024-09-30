/** @format */

import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleReportGeneralAll } from "$backend/database/get/vehicle-general-reports";
import { tauriGetVehicleAll } from "$backend/database/get/vehicles";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralEntry } from "$types/models/vehicle-report-general";
import { LoaderFunction } from "react-router-dom";

export type VehicleReportGeneralIndexPageLoaderData = {
  vehicleSelectOptions: VehicleModel[];
  reportEntries: VehicleReportGeneralEntry[];
  topicComboBoxOptions: string[];
};
export const vehicleReportGeneralIndexPageLoader: LoaderFunction =
  async () => {
    const reports = (
      await tauriGetVehicleReportGeneralAll()
    ).map(VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toEntry);
    const reportEntries = (
      await Promise.all(reports)
    ).filter((report) => report !== null);
    const vehicleSelectOptions = await tauriGetVehicleAll();
    const topicComboBoxOptions = await tauriGetTopicAll();
    const loaderData: VehicleReportGeneralIndexPageLoaderData =
      {
        topicComboBoxOptions,
        vehicleSelectOptions,
        reportEntries,
      };
    return loaderData;
  };
