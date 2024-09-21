import { getPickupRoute } from "$backend/database/get/pickup-routes";
import { getPickupRouteReportGeneral } from "$backend/database/get/pickup-routes-general-reports";
import { getTopicAll } from "$backend/database/get/topics";
import { TRANSLATION } from "$locale/th";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { LoaderFunction, json } from "react-router-dom";

export type PickupRouteReportGeneralInfoPageLoaderData = {
  report: PickupRouteReportGeneralModel;
  route: PickupRouteModel;
  topicComboBoxOptions: string[];
};
export const pickupRouteReportGeneralInfoPageLoader: LoaderFunction = async ({
  params,
}) => {
  if (params.reportId === undefined) {
    throw json(
      {},
      {
        status: 400,
        statusText: TRANSLATION.pickupRouteGeneralReportIdIsMissingFromParams,
      }
    );
  }
  const reportId = Number.parseInt(params.reportId);
  const report = await getPickupRouteReportGeneral(reportId);
  if (report === null) {
    throw json(
      {},
      {
        status: 404,
        statusText: TRANSLATION.pickupRouteGeneralReportIsMissingFromDatabase,
      }
    );
  }
  const route = await getPickupRoute(report.route_id);
  if (route === null) {
    throw json(
      {},
      {
        status: 404,
        statusText: TRANSLATION.pickupRouteIsMissingFromDatabase,
      }
    );
  }

  const topicComboBoxOptions = await getTopicAll();
  const loaderData: PickupRouteReportGeneralInfoPageLoaderData = {
    report,
    route,
    topicComboBoxOptions,
  };

  return loaderData;
};
