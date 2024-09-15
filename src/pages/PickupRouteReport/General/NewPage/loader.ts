import {
  getPickupRoute,
  getPickupRouteAll,
  getTopicAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralFormData } from "$types/models/pickup-route-report-general";
import dayjs from "dayjs";
import { json, LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
  initFormData: PickupRouteReportGeneralFormData;
  routeSelectOptions: PickupRouteModel[];
  topicComboBoxOptions: string[];
  selectedRoute: PickupRouteModel | null;
};
export const newPageLoader: LoaderFunction = async ({
  request,
}) => {
  const url = new URL(request.url);
  const queryRouteId = url.searchParams.get("routeId");

  let route: PickupRouteModel | null = null;
  let selectedRoute: PickupRouteModel | null = null;
  let routeSelectOptions: PickupRouteModel[] = [];
  if (queryRouteId !== null) {
    selectedRoute = await getPickupRoute(
      Number.parseInt(queryRouteId),
    );
    if (selectedRoute === null) {
      throw json(
        {},
        {
          status: 404,
          statusText:
            TRANSLATION.errorPickupRouteIsMissingFromDatabase,
        },
      );
    }

    route = selectedRoute;
    routeSelectOptions = [selectedRoute];
  } else {
    routeSelectOptions = await getPickupRouteAll();
    if (routeSelectOptions.length === 0) {
      throw json(
        {},
        {
          status: 400,
          statusText:
            TRANSLATION.errorNoPickupRouteInDatabase,
        },
      );
    }
    route = routeSelectOptions[0];
  }
  const topicComboBoxOptions = await getTopicAll();
  const initFormData: PickupRouteReportGeneralFormData = {
    datetime: dayjs().format(),
    content: "",
    title: "",
    route,
    topics: [],
  };

  const loaderData: NewPageLoaderData = {
    initFormData,
    selectedRoute,
    routeSelectOptions,
    topicComboBoxOptions,
  };

  return loaderData;
};
