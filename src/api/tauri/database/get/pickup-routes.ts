/** @format */

import { PickupRouteModel } from "$types/models/pickup-route";
import { tauri } from "@tauri-apps/api";

export const tauriGetPickupRouteAll = async (): Promise<PickupRouteModel[]> =>
	tauri.invoke("get_pickup_route_all");

export const tauriGetPickupRoute = async (
	routeId: number
): Promise<PickupRouteModel | null> =>
	tauri.invoke("get_pickup_route", { routeId });
