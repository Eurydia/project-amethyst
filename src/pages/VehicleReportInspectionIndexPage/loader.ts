import { getVehicleReportInspectionAll } from "$backend/database/get/vehicle-inspection-reports";
import { getVehicleAll } from "$backend/database/get/vehicles";
import { getTopicAll } from "$backend/database/get/topics";
import { VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-inspection-model";
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
      await getVehicleReportInspectionAll()
    ).map(
      VEHICLE_REPORT_INSPECTION_MODEL_TRANSFORMER.toVehicleReportInspectionEntry,
    );
    const reportEntries = (
      await Promise.all(reports)
    ).filter((entry) => entry !== null);
    const vehicleSelectOptions = await getVehicleAll();
    const topicComboBoxOptions = await getTopicAll();
    const loaderData: VehicleReportInspectionIndexPageLoaderData =
      {
        topicComboBoxOptions,
        vehicleSelectOptions,
        reportEntries,
      };
    return loaderData;
  };
