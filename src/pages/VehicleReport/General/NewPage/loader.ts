import {
  getTopicAll,
  getVehicle,
  getVehicleAll,
} from "$backend/database/get";
import { TRANSLATION } from "$locale/th";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import dayjs from "dayjs";
import { json, LoaderFunction } from "react-router-dom";

export type NewPageLoaderData = {
  vehicleSelectOptions: VehicleModel[];
  topicComboBoxOptions: string[];
  initFormData: VehicleReportGeneralFormData;
  selectedVehicle: VehicleModel | null;
};
export const newPageLoader: LoaderFunction = async ({
  request,
}) => {
  const url = new URL(request.url);
  const queryVehicleId = url.searchParams.get("vehicleId");

  let vehicleSelectOptions: VehicleModel[] = [];
  let vehicle: VehicleModel | null = null;
  let selectedVehicle: VehicleModel | null = null;
  if (queryVehicleId !== null) {
    selectedVehicle = await getVehicle(
      Number.parseInt(queryVehicleId),
    );
    if (selectedVehicle === null) {
      throw json(
        {},
        {
          status: 400,
          statusText:
            TRANSLATION.errorVehicleIsMissingFromDatabase,
        },
      );
    }
    vehicleSelectOptions = [selectedVehicle];
    vehicle = selectedVehicle;
  } else {
    vehicleSelectOptions = await getVehicleAll();
    if (vehicleSelectOptions.length === 0) {
      throw json(
        {},
        {
          status: 400,
          statusText: TRANSLATION.errorNoVehicleInDatabase,
        },
      );
    }
    vehicle = vehicleSelectOptions[0];
  }

  const topicComboBoxOptions = await getTopicAll();
  const initFormData: VehicleReportGeneralFormData = {
    vehicle,
    datetime: dayjs().format(),
    content: "",
    title: "",
    topics: [],
  };

  const loaderData: NewPageLoaderData = {
    selectedVehicle,
    initFormData,
    topicComboBoxOptions,
    vehicleSelectOptions,
  };

  return loaderData;
};
