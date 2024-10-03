import { vehicleReportGeneralModelSchema } from "$types/models/vehicle-report-general";
import { tauri } from "@tauri-apps/api";

export const tauriGetVehicleReportGeneralAll = async () => {
  const reports = await tauri.invoke(
    "get_vehicle_report_general_all"
  );
  const r = vehicleReportGeneralModelSchema
    .array()
    .safeParse(reports);
  return r.success ? r.data : [];
};
export const tauriGetVehicleReportGeneral = async (
  reportId: number
) => {
  const report = await tauri.invoke(
    "get_vehicle_report_general",
    {
      reportId,
    }
  );
  const r =
    vehicleReportGeneralModelSchema.safeParse(report);
  return r.success ? r.data : null;
};
