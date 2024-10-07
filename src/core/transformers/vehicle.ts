import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetOperationalLogToday } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import {
  CITIES,
  KNOWN_VEHICLE_CLASSES,
} from "$core/constants";
import {
  VehicleEntry,
  VehicleExportData,
  VehicleFormData,
  VehicleModel,
} from "$types/models/vehicle";

export const VEHICLE_MODEL_TRANSFORMER = {
  toExportData: (vehicle: VehicleModel) => {
    const exportData: VehicleExportData = {
      "รหัส": vehicle.id,
      "เลขทะเบียน": vehicle.license_plate,
      "จังหวัดที่จดทะเบียน": vehicle.registered_city,
      "หจก.": vehicle.vendor,
      "ประเภทรถ": vehicle.vehicle_class,
    };
    return exportData;
  },

  toEntry: async (vehicle: VehicleModel) => {
    const logs = await tauriGetOperationalLogToday();

    const driverIds = new Set<number>();
    const routeIds = new Set<number>();
    for (const log of logs) {
      if (log.vehicle_id !== vehicle.id) {
        continue;
      }
      driverIds.add(log.driver_id);
      routeIds.add(log.route_id);
    }

    const drivers = (
      await Promise.all([...driverIds].map(tauriGetDriver))
    )
      .filter((driver) => driver !== null)
      .map(({ id, name, surname }) => ({
        id,
        name,
        surname,
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

    const entry: VehicleEntry = {
      id: vehicle.id,
      license_plate: vehicle.license_plate,
      routes,
      drivers,
    };
    return entry;
  },

  toFormData: (
    vehicle: VehicleModel | undefined,
    vendor: string
  ): VehicleFormData => {
    if (vehicle === undefined) {
      const formData: VehicleFormData = {
        license_plate: "",
        vendor: (vendor ?? "").trim().normalize(),
        registered_city: CITIES[0],
        vehicle_class: KNOWN_VEHICLE_CLASSES[0],
      };
      return formData;
    }

    const formData: VehicleFormData = {
      license_plate: vehicle.license_plate
        .trim()
        .normalize(),
      vendor: vehicle.vendor.trim().normalize(),
      registered_city: vehicle.registered_city,
      vehicle_class: vehicle.vehicle_class,
    };

    return formData;
  },
};
