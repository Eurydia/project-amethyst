import { getPickupRouteReportGeneralAll } from "$backend/database/get/pickup-routes";
import { getPickupRouteAll } from "$backend/database/get/pickup-routes";
import { getTopicAll } from "$backend/database/get/topics";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general-model";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
import { LoaderFunction } from "react-router-dom";

export type PickupRouteReportGeneralIndexPageLoaderData = {
  reportEntries: PickupRouteReportGeneralEntry[];
  routeSelectOptions: PickupRouteModel[];
  topicComboBoxOptions: string[];
};
export const pickupRouteReportGeneralIndexPageLoader: LoaderFunction =
  async () => {
    const reports = (
      await getPickupRouteReportGeneralAll()
    ).map(
      PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toPickupRouteReportGeneralEntry,
    );
    const reportEntries = (
      await Promise.all(reports)
    ).filter((entry) => entry !== null);

    const routeSelectOptions = await getPickupRouteAll();
    const topicComboBoxOptions = await getTopicAll();
    const loaderData: PickupRouteReportGeneralIndexPageLoaderData =
      {
        reportEntries,
        routeSelectOptions,
        topicComboBoxOptions,
      };
    return loaderData;
  };
