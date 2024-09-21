import { PickupRouteModel } from "$types/models/pickup-route";
import { tauri } from "@tauri-apps/api";

export const getPickupRouteAll = async (): Promise<PickupRouteModel[]> =>
  tauri.invoke("get_pickup_route_all");

export const getPickupRoute = async (
  routeId: number
): Promise<PickupRouteModel | null> =>
  tauri.invoke("get_pickup_route", { routeId });
