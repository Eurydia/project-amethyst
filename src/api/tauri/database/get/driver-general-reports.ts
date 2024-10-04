import { driverReportModelSchema } from "$types/models/driver-report";
import { tauri } from "@tauri-apps/api";

export const tauriGetDriverReportGeneralAll = async () => {
  const reports = await tauri.invoke(
    "get_driver_report_general_all"
  );
  const r = driverReportModelSchema
    .array()
    .safeParse(reports);
  return r.success ? r.data : [];
};

export const tauriGetDriverReportGeneral = async (
  reportId: number
) => {
  const report = await tauri.invoke(
    "get_driver_report_general",
    {
      reportId,
    }
  );
  const r = driverReportModelSchema.safeParse(report);
  return r.success ? r.data : null;
};
