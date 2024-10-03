/** @format */

import { tauriGetPickupRouteAll } from "$backend/database/get/pickup-routes";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-model";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { LoaderFunction } from "react-router-dom";

export type PickupRouteIndexPageLoaderData = {
  routeEntries: PickupRouteEntry[];
};
export const pickupRouteIndexPageLoader: LoaderFunction =
  async () => {
    const routes = await tauriGetPickupRouteAll();
    const routeEntries = await Promise.all(
      routes.map(PICKUP_ROUTE_MODEL_TRANSFORMER.toEntry)
    );

    const loaderData: PickupRouteIndexPageLoaderData = {
      routeEntries,
    };
    return loaderData;
  };
