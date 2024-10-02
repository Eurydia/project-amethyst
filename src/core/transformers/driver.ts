import { tauriGetOperationLogToday } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  DriverEntry,
  DriverFormData,
  DriverModel,
} from "$types/models/driver";

export const DRIVER_MODEL_TRANSFORMER = {
  toEntry: async (driver: DriverModel) => {
    const routeIds = new Set<number>();
    const vehicleIds = new Set<number>();

    (await tauriGetOperationLogToday())
      .filter(({ driver_id }) => driver_id === driver.id)
      .forEach(({ vehicle_id, route_id }) => {
        routeIds.add(route_id);
        vehicleIds.add(vehicle_id);
      });

    const vehicles = (
      await Promise.all(
        [...vehicleIds].map(tauriGetVehicle)
      )
    )
      .filter((vehicle) => vehicle !== null)
      .map(({ id, license_plate }) => ({
        id,
        licensePlate: license_plate,
      }));

    const routes = (
      await Promise.all(
        [...routeIds].map(tauriGetPickupRoute)
      )
    )
      .filter((route) => route !== null)
      .map(({ id, name }) => ({
        id,
        name,
      }));

    const entry: DriverEntry = {
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      routes,
      vehicles,
    };
    return entry;
  },

  toFormData: (driver: DriverModel | undefined) => {
    let formData: DriverFormData = {
      name: "",
      surname: "",
      contact: "",
      licenseType: "",
    };
    if (driver !== undefined) {
      formData = {
        name: driver.name.trim().normalize(),
        surname: driver.surname.trim().normalize(),
        contact: driver.contact.trim().normalize(),
        licenseType: driver.license_type.trim().normalize(),
      };
    }
    return formData;
  },
};
