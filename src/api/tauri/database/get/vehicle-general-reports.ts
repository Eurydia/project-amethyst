import { VehicleReportGeneralModel } from "$types/models/vehicle-report-general";
import { tauri } from "@tauri-apps/api";

export const getVehicleReportGeneralAll = async (): Promise<
  VehicleReportGeneralModel[]
> => await tauri.invoke("get_vehicle_report_general_all");

export const getVehicleReportGeneral = async (
  reportId: number
): Promise<VehicleReportGeneralModel | null> =>
  tauri.invoke("get_vehicle_report_general", {
    reportId,
  });
