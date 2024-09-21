import { getVehicleAll } from "$backend/database/get/vehicles";
import { getVehicleVendorAll } from "$backend/database/get/vehicle-vendors";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle-model";
import { VehicleEntry } from "$types/models/vehicle";
import { LoaderFunction } from "react-router-dom";

export type VehicleIndexPageLoaderData = {
  vehicleEntries: VehicleEntry[];
  vendorComboBoxOptions: string[];
};
export const vehicleIndexPageLoader: LoaderFunction =
  async () => {
    const vehicles = await getVehicleAll();
    const vehicleEntries = await Promise.all(
      vehicles.map(
        VEHICLE_MODEL_TRANSFORMER.toVehicleEntry,
      ),
    );

    const vendorComboBoxOptions =
      await getVehicleVendorAll();

    const loaderData: VehicleIndexPageLoaderData = {
      vehicleEntries,
      vendorComboBoxOptions,
    };
    return loaderData;
  };
