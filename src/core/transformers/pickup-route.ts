import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriGetOperationalLogToday } from "$backend/database/get/operational-logs";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {
  PickupRouteEntry,
  PickupRouteExportData,
  PickupRouteFormData,
  PickupRouteModel,
} from "$types/models/pickup-route";
import dayjs from "dayjs";

export const PICKUP_ROUTE_MODEL_TRANSFORMER = {
  toEntry: async (route: PickupRouteModel) => {
    const logs = (
      await tauriGetOperationalLogToday()
    ).filter((log) => log.route_id === route.id);
    const driverIds = new Set<number>();
    const vehicleIds = new Set<number>();
    for (const log of logs) {
      driverIds.add(log.driver_id);
      vehicleIds.add(log.vehicle_id);
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

    const entry: PickupRouteEntry = {
      id: route.id,
      name: route.name,
      drivers,
      vehicles,
    };
    return entry;
  },

  toExportData: (route: PickupRouteModel) => {
    const data: PickupRouteExportData = {
      รหัส: route.id,
      ชื่อสาย: route.name,
      เวลารับเข้า: dayjs(route.arrival_time)
        .locale("th")
        .format("HH:mm น."),
      เวลารับออก: dayjs(route.departure_time)
        .locale("th")
        .format("HH:mm น."),
    };
    return data;
  },

  toFormData: (route: PickupRouteModel | undefined) => {
    if (route === undefined) {
      const formData: PickupRouteFormData = {
        name: "",
        arrival_time: dayjs()
          .startOf("day")
          .format("HH:mm"),
        departure_time: dayjs()
          .endOf("day")
          .format("HH:mm"),
      };
      return formData;
    }
    let departure = dayjs(route.departure_time, "HH:mm");
    if (!departure.isValid()) {
      departure = dayjs().endOf("day");
    }
    let arrival = dayjs(route.arrival_time, "HH:mm");
    if (!arrival.isValid()) {
      arrival = dayjs().startOf("day");
    }
    const formData: PickupRouteFormData = {
      name: route.name.trim().normalize(),
      arrival_time: arrival.format("HH:mm"),
      departure_time: departure.format("HH:mm"),
    };
    return formData;
  },
};
