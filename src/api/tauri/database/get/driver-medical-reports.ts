/** @format */

import { DriverReportModel } from "$types/models/driver-report";
import { tauri } from "@tauri-apps/api";

export const tauriGetDriverReportMedicalAll = async (): Promise<
	DriverReportModel[]
> => tauri.invoke("get_driver_report_medical_all");

export const tauriGetDriverReportMedical = async (
	reportId: number
): Promise<DriverReportModel | null> =>
	tauri.invoke("get_driver_report_medical", {
		reportId,
	});
