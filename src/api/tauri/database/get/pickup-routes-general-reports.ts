/** @format */

import { PickupRouteReportGeneralModel } from "$types/models/pickup-route-report-general";
import { tauri } from "@tauri-apps/api";

export const tauriGetPickupRouteReportGeneralAll = async (): Promise<
	PickupRouteReportGeneralModel[]
> => tauri.invoke("get_pickup_route_report_general_all");

export const tauriGetPickupRouteReportGeneral = async (
	reportId: number
): Promise<PickupRouteReportGeneralModel> =>
	tauri.invoke("get_pickup_route_report_general", {
		reportId,
	});
