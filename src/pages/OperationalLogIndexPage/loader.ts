import {
  getDriverAll,
  getOperationLogAll,
  getPickupRouteAll,
  getVehicleAll,
} from "$backend/database/get";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log-model";
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
    const driverSelectOptions = await getDriverAll();
    const vehicleSelectOptions = await getVehicleAll();
    const routeSelectOptions = await getPickupRouteAll();

    const logs = (await getOperationLogAll()).map(
      OPERATIONAL_LOG_MODEL_TRANSFORMER.toOperationalLogEntry,
    );
    const logEntries = (await Promise.all(logs)).filter(
      (log) => log !== null,
    );

    const loaderData: OperationalLogIndexPageLoaderData = {
      logEntries,
      driverSelectOptions,
      routeSelectOptions,
      vehicleSelectOptions,
    };
    return loaderData;
  };
