import {
  getDriverAll,
  getOperationLogAll,
  getPickupRoute,
  getPickupRouteReportGeneralAll,
  getTopicAll,
  getVehicleAll,
} from "$backend/database/get";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general-model";
import { TRANSLATION } from "$locale/th";
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
    if (params.routeId === undefined) {
      throw json(
        {},
        {
          status: 400,
          statusText:
            TRANSLATION.pickupRouteIdIsMissingFromParams,
        },
      );
    }
    const routeId = Number.parseInt(params.routeId);
    const route = await getPickupRoute(routeId);
    if (route === null) {
      throw json(
        {},
        {
          status: 404,
          statusText:
            TRANSLATION.pickupRouteIsMissingFromDatabase,
        },
      );
    }

    const logs = (await getOperationLogAll())
      .filter(({ route_id }) => route_id === route.id)
      .map(
        OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
      );
    const reports = (await getPickupRouteReportGeneralAll())
      .filter(({ route_id }) => route_id === route.id)
      .map(
        PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toPickupRouteReportGeneralEntry,
      );

    const reportEntries = (
      await Promise.all(reports)
    ).filter((report) => report !== null);
    const logEntries = (await Promise.all(logs)).filter(
      (entry) => entry !== null,
    );

    const driverSelectOptions = await getDriverAll();
    const vehicleSelectOptions = await getVehicleAll();
    const topicComboBoxOptions = await getTopicAll();
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
