import {
  PickupRouteModel,
  pickupRouteModelSchema,
} from "$types/models/pickup-route";
import { tauri } from "@tauri-apps/api";

const _prepare = (route: PickupRouteModel) => {
  const _r: PickupRouteModel = {
    id: route.id,
    name: route.name.trim().normalize(),
    arrival_time: route.arrival_time,
    departure_time: route.departure_time,
  };
  return _r;
};
export const tauriGetPickupRouteAll = async () => {
  const routes = await tauri.invoke("get_pickup_route_all");
  const r = pickupRouteModelSchema
    .array()
    .safeParse(routes);
  return (r.success ? r.data : []).map(_prepare);
};
export const tauriGetPickupRoute = async (
  routeId: number
) => {
  const route = await tauri.invoke("get_pickup_route", {
    routeId,
  });
  const r = pickupRouteModelSchema.safeParse(route);
  return r.success ? _prepare(r.data) : null;
};
