/** @format */

import { tauriGetPickupRouteAll } from "$backend/database/get/pickup-routes";
import { tauriGetPickupRouteReportGeneralAll } from "$backend/database/get/pickup-routes-general-reports";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general";
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
      await tauriGetPickupRouteReportGeneralAll()
    ).map(
      PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toEntry
    );
    const reportEntries = (
      await Promise.all(reports)
    ).filter((entry) => entry !== null);

    const routeSelectOptions =
      await tauriGetPickupRouteAll();
    const topicComboBoxOptions = await tauriGetTopicAll();
    const loaderData: PickupRouteReportGeneralIndexPageLoaderData =
      {
        reportEntries,
        routeSelectOptions,
        topicComboBoxOptions,
      };
    return loaderData;
  };
