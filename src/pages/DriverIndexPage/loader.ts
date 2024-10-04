import { tauriGetDriverAll } from "$backend/database/get/drivers";
import { DRIVER_MODEL_TRANSFORMER } from "$core/transformers/driver";
import { DriverEntry } from "$types/models/driver";
import { LoaderFunction } from "react-router-dom";

export type DriverIndexPageLoaderData = {
  driverEntries: DriverEntry[];
};
export const driverIndexPageLoader: LoaderFunction =
  async () => {
    const drivers = (await tauriGetDriverAll()).map(
      DRIVER_MODEL_TRANSFORMER.toEntry
    );

    const driverEntries = (
      await Promise.all(drivers)
    ).filter((entry) => entry !== null);

    const loaderData: DriverIndexPageLoaderData = {
      driverEntries,
    };
    return loaderData;
  };
