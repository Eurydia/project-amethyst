import { PickupRouteModel } from "./pickup-route";

export type PickupRouteReportGeneralModel = {
  report_id: number;
  datetime: string;
  title: string;
  content: string;
  topics: string;
};

export type PickupRouteReportGeneralEntry = {
  datetime: string;
  routeName: string;
  routeId: number;
  id: number;
  title: string;
  topics: string[];
};

export type PickupRouteReportGeneralFormData = {
  route: PickupRouteModel;
  datetime: string;
  title: string;
  content: string;
  topics: string[];
};
