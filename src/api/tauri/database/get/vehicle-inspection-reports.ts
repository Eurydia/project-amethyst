/** @format */

import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { tauri } from "@tauri-apps/api";

export const tauriGetVehicleReportInspectionAll = async (): Promise<
	VehicleReportInspectionModel[]
> => tauri.invoke("get_vehicle_report_inspection_all");

export const tauriGetVehicleReportInspection = async (
	reportId: number
): Promise<VehicleReportInspectionModel | null> =>
	tauri.invoke("get_vehicle_report_inspection", {
		reportId,
	});
