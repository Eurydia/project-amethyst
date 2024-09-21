import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { tauri } from "@tauri-apps/api";

export const getPickupRouteGeneralReportAll = async (): Promise<
  PickupRouteReportGeneralModel[]
> => tauri.invoke("get_pickup_route_general_report_all");

export const getPickupRouteGeneralReport = async (
  reportId: number
): Promise<PickupRouteReportGeneralModel[]> =>
  tauri.invoke("get_pickup_route_general_report", {
    reportId,
  });
