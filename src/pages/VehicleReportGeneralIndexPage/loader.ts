import {
  getTopicAll,
  getVehicleAll,
  getVehicleReportGeneralAll,
} from "$backend/database/get";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general-model";
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
      await getVehicleReportGeneralAll()
    ).map(
      VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toVehicleReportGeneralEntry,
    );
    const reportEntries = (
      await Promise.all(reports)
    ).filter((report) => report !== null);
    const vehicleSelectOptions = await getVehicleAll();
    const topicComboBoxOptions = await getTopicAll();
    const loaderData: VehicleReportGeneralIndexPageLoaderData =
      {
        topicComboBoxOptions,
        vehicleSelectOptions,
        reportEntries,
      };
    return loaderData;
  };
