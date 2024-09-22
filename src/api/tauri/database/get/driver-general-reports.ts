/** @format */

import { DriverReportModel } from "$types/models/driver-report";
import { tauri } from "@tauri-apps/api";

export const tauriGetDriverReportGeneralAll = async (): Promise<
	DriverReportModel[]
> => tauri.invoke("get_driver_report_general_all");

export const tauriGetDriverReportGeneral = async (
	reportId: number
): Promise<DriverReportModel | null> =>
	tauri.invoke("get_driver_report_general", {
		reportId,
	});
