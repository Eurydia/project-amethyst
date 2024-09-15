import {
  getPickupRouteAll,
  getPickupRouteReportGeneralAll,
} from "$backend/database/get";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general-model";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
import { LoaderFunction } from "react-router-dom";

export type IndexPageLoaderData = {
  reportEntries: PickupRouteReportGeneralEntry[];
  databaseHasNoRoute: boolean;
};
export const indexPageLoader: LoaderFunction = async () => {
  const reports = (
    await getPickupRouteReportGeneralAll()
  ).map(
    PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toPickupRouteReportGeneralEntry,
  );
  const reportEntries = (await Promise.all(reports)).filter(
    (entry) => entry !== null,
  );

  const routes = await getPickupRouteAll();
  const databaseHasNoRoute = routes.length === 0;

  const loaderData: IndexPageLoaderData = {
    reportEntries,
    databaseHasNoRoute,
  };
  return loaderData;
};
