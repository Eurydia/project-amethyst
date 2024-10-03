import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetOperationLogToday } from "$backend/database/get/operational-logs";
import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import {
  VehicleEntry,
  VehicleExportData,
  VehicleFormData,
  VehicleModel,
} from "$types/models/vehicle";

export const VEHICLE_MODEL_TRANSFORMER = {
  toExportData: async (vehicle: VehicleModel) => {
    const exportData: VehicleExportData = {
      เลขทะเบียน: vehicle.license_plate,
      จังหวัดที่จดทะเบียน: vehicle.registered_city,
      หจก: vehicle.vendor,
      ประเภทรถ: vehicle.vehicle_class,
    };
    return exportData;
  },

  toEntry: async (vehicle: VehicleModel) => {
    const logs = await tauriGetOperationLogToday();

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

  // Transform a VehicleModel to a VehicleFormData
  // Returns the "default" VehicleFormData if vehicle is undefined
  toFormData: (
    vehicle: VehicleModel | undefined = undefined
  ): VehicleFormData => {
    let formData: VehicleFormData = {
      licensePlate: "",
      registeredCity: "",
      vendor: "",
      vehicleClass: "",
    };
    if (vehicle === undefined) {
      return formData;
    }

    formData = {
      licensePlate: vehicle.license_plate
        .trim()
        .normalize(),
      registeredCity: vehicle.registered_city
        .trim()
        .normalize(),
      vendor: vehicle.vendor.trim().normalize(),
      vehicleClass: vehicle.vehicle_class
        .trim()
        .normalize(),
    };
    return formData;
  },
};
