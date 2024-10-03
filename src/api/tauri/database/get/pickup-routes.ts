import { pickupRouteModelSchema } from "$types/models/pickup-route";
import { tauri } from "@tauri-apps/api";

export const tauriGetPickupRouteAll = async () => {
  const routes = await tauri.invoke("get_pickup_route_all");
  const r = pickupRouteModelSchema
    .array()
    .safeParse(routes);
  return r.success ? r.data : [];
};
export const tauriGetPickupRoute = async (
  routeId: number
) => {
  const route = await tauri.invoke("get_pickup_route", {
    routeId,
  });
  const r = pickupRouteModelSchema.safeParse(route);
  return r.success ? r.data : null;
};
