/** @format */

import { tauriGetDriverAll } from "$backend/database/get/drivers";
import { tauriGetOperationLogAll } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetPickupRouteReportGeneralAll } from "$backend/database/get/pickup-routes-general-reports";
import { tauriGetTopicAll } from "$backend/database/get/topics";
import { tauriGetVehicleAll } from "$backend/database/get/vehicles";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general";
import { TH_LOCALE } from "$locale/th";
import { DriverModel } from "$types/models/driver";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
import { VehicleModel } from "$types/models/vehicle";
import { json, LoaderFunction } from "react-router-dom";

export type PickupRouteInfoPageLoaderData = {
  route: PickupRouteModel;

  logEntries: OperationalLogEntry[];
  reportEntries: PickupRouteReportGeneralEntry[];
  driverSelectOptions: DriverModel[];
  vehicleSelectOptions: VehicleModel[];
  topicComboBoxOptions: string[];
};
export const pickupRouteInfoPageLoader: LoaderFunction =
  async ({ params }) => {
    console.log(params);
    if (params.routeId === undefined) {
      throw json(
        {},
        {
          status: 400,
          statusText:
            TH_LOCALE.pickupRouteIdIsMissingFromParams,
        }
      );
    }
    const routeId = Number.parseInt(params.routeId);
    const route = await tauriGetPickupRoute(routeId);
    if (route === null) {
      throw json(
        {},
        {
          status: 404,
          statusText:
            TH_LOCALE.pickupRouteIsMissingFromDatabase,
        }
      );
    }

    const logs = (await tauriGetOperationLogAll())
      .filter(({ route_id }) => route_id === route.id)
      .map(OPERATIONAL_LOG_MODEL_TRANSFORMER.toEntry);
    const reports = (
      await tauriGetPickupRouteReportGeneralAll()
    )
      .filter(({ route_id }) => route_id === route.id)
      .map(
        PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toEntry
      );

    const reportEntries = (
      await Promise.all(reports)
    ).filter((report) => report !== null);
    const logEntries = (await Promise.all(logs)).filter(
      (entry) => entry !== null
    );

    const driverSelectOptions = await tauriGetDriverAll();
    const vehicleSelectOptions = await tauriGetVehicleAll();
    const topicComboBoxOptions = await tauriGetTopicAll();
    const loaderData: PickupRouteInfoPageLoaderData = {
      route,
      topicComboBoxOptions,
      driverSelectOptions,
      vehicleSelectOptions,
      logEntries,
      reportEntries,
    };

    return loaderData;
  };
