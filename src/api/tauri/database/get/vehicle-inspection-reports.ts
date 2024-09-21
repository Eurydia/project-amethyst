import { VehicleReportInspectionModel } from "$types/models/vehicle-report-inspection";
import { tauri } from "@tauri-apps/api";

export const getVehicleReportInspectionAll = async (): Promise<
  VehicleReportInspectionModel[]
> => tauri.invoke("get_vehicle_report_inspection_all");

export const getVehicleReportInspection = async (
  reportId: number
): Promise<VehicleReportInspectionModel | null> =>
  tauri.invoke("get_vehicle_report_inspection", {
    reportId,
  });
