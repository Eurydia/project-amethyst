import { getVehicleAll } from "$backend/database/get";
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

    const vendors = new Set<string>();
    for (const vehicle of vehicles) {
      vendors.add(vehicle.vendor);
    }
    const vendorComboBoxOptions = [...vendors];

    const loaderData: VehicleIndexPageLoaderData = {
      vehicleEntries,
      vendorComboBoxOptions,
    };
    return loaderData;
  };
