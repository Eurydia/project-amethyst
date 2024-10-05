/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetPickupRouteReportGeneral } from "$backend/database/get/pickup-routes-general-reports";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import {
  BadRequestError,
  PickupRouteMissingFromDatabaseError,
  PickupRouteReportGeneralMissingFromDatabaseError,
} from "$core/errors";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { LoaderFunction } from "react-router-dom";

export type PickupRouteReportGeneralInfoPageLoaderData = {
  report: PickupRouteReportGeneralModel;
  route: PickupRouteModel;
  topicComboBoxOptions: string[];
};
export const pickupRouteReportGeneralInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    if (params.reportId === undefined) {
      throw BadRequestError();
    }
    const reportId = Number.parseInt(params.reportId);
    const report = await tauriGetPickupRouteReportGeneral(
      reportId
    );
    if (report === null) {
      throw PickupRouteReportGeneralMissingFromDatabaseError();
    }
    const route = await tauriGetPickupRoute(
      report.route_id
    );
    if (route === null) {
      throw PickupRouteMissingFromDatabaseError();
    }

    const topicComboBoxOptions = await tauriGetTopicAll();
    const loaderData: PickupRouteReportGeneralInfoPageLoaderData =
      {
        report,
        route,
        topicComboBoxOptions,
      };

    return loaderData;
  };
