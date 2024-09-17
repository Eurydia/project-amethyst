import { getPickupRouteAll } from "$backend/database/get";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-model";
import {
  PickupRouteEntry,
  PickupRouteFormData,
} from "$types/models/pickup-route";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type PickupRouteIndexPageLoaderData = {
  routeEntries: PickupRouteEntry[];
  initFormData: PickupRouteFormData;
};
export const pickupRouteIndexPageLoader: LoaderFunction =
  async () => {
    const routes = await getPickupRouteAll();
    const routeEntries = await Promise.all(
      routes.map(
        PICKUP_ROUTE_MODEL_TRANSFORMER.toPickupRouteEntry,
      ),
    );

    const initFormData: PickupRouteFormData = {
      arrivalTime: dayjs().startOf("day").format("HH:mm"),
      departureTime: dayjs().endOf("day").format("HH:mm"),
      name: "",
    };

    const loaderData: PickupRouteIndexPageLoaderData = {
      routeEntries,
      initFormData,
    };
    return loaderData;
  };
