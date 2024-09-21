import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { tauri } from "@tauri-apps/api";

export const getPickupRouteReportGeneralAll = async (): Promise<
  PickupRouteReportGeneralModel[]
> => tauri.invoke("get_pickup_route_report_general_all");

export const getPickupRouteReportGeneral = async (
  reportId: number
): Promise<PickupRouteReportGeneralModel> =>
  tauri.invoke("get_pickup_route_report_general", {
    reportId,
  });
