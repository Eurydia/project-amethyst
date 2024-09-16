import { PickupRouteFormData } from "$types/models/pickup-route";
import dayjs from "dayjs";
import { LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
  initFormData: PickupRouteFormData;
};
export const newPageLoader: LoaderFunction = async () => {
  const initFormData: PickupRouteFormData = {
    name: "",
    arrivalTime: dayjs().startOf("day").format("HH:mm"),
    departureTime: dayjs().endOf("day").format("HH:mm"),
  };
  const loaderData: NewPageLoaderData = {
    initFormData,
  };
  return loaderData;
};
