/** @format */

import { tauriGetDriverAll } from "$backend/database/get/drivers";
import { tauriGetOperationLogAll } from "$backend/database/get/operational-logs";
import { tauriGetPickupRouteAll } from "$backend/database/get/pickup-routes";
import { tauriGetVehicleAll } from "$backend/database/get/vehicles";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log";
import { DriverModel } from "$types/models/driver";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { LoaderFunction } from "react-router-dom";

export type OperationalLogIndexPageLoaderData = {
  driverSelectOptions: DriverModel[];
  vehicleSelectOptions: VehicleModel[];
  routeSelectOptions: PickupRouteModel[];
  logEntries: OperationalLogEntry[];
};
export const operationalLogIndexPageLoader: LoaderFunction =
  async () => {
    const driverSelectOptions = await tauriGetDriverAll();
    const vehicleSelectOptions = await tauriGetVehicleAll();
    const routeSelectOptions =
      await tauriGetPickupRouteAll();

    const logs = (await tauriGetOperationLogAll()).map(
      OPERATIONAL_LOG_MODEL_TRANSFORMER.toEntry
    );
    const logEntries = (await Promise.all(logs)).filter(
      (log) => log !== null
    );

    const loaderData: OperationalLogIndexPageLoaderData = {
      logEntries,
      driverSelectOptions,
      routeSelectOptions,
      vehicleSelectOptions,
    };
    return loaderData;
  };
