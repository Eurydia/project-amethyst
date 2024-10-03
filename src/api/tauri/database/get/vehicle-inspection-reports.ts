import { vehicleReportInspectionModelSchema } from "$types/models/vehicle-report-inspection";
import { tauri } from "@tauri-apps/api";

export const tauriGetVehicleReportInspectionAll =
  async () => {
    const reports = await tauri.invoke(
      "get_vehicle_report_inspection_all"
    );
    const r = vehicleReportInspectionModelSchema
      .array()
      .safeParse(reports);
    return r.success ? r.data : [];
  };
export const tauriGetVehicleReportInspection = async (
  reportId: number
) => {
  const report = await tauri.invoke(
    "get_vehicle_report_inspection",
    {
      reportId,
    }
  );
  const r =
    vehicleReportInspectionModelSchema.safeParse(report);
  return r.success ? r.data : null;
};
