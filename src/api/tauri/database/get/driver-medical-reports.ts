import {
  DriverReportModel,
  driverReportModelSchema,
} from "$types/models/driver-report";
import { tauri } from "@tauri-apps/api";

const _prepare = (report: DriverReportModel) => {
  const _r: DriverReportModel = {
    ...report,
    title: report.title.trim().normalize(),
    content: report.content.trim().normalize(),
    topics: report.topics
      .split(",")
      .map((topic) => topic.trim().normalize())
      .filter((topic) => topic.length > 0)
      .join(","),
  };
  return _r;
};

export const tauriGetDriverReportMedicalAll = async () => {
  const reports = await tauri.invoke(
    "get_driver_report_medical_all"
  );
  const r = driverReportModelSchema
    .array()
    .safeParse(reports);
  return (r.success ? r.data : []).map(_prepare);
};

export const tauriGetDriverReportMedical = async (
  reportId: number
) => {
  const report = await tauri.invoke(
    "get_driver_report_medical",
    {
      reportId,
    }
  );
  const r = driverReportModelSchema.safeParse(report);
  return r.success ? _prepare(r.data) : null;
};
