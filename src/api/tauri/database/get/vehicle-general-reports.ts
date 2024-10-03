import {
  VehicleReportGeneralModel,
  vehicleReportGeneralModelSchema,
} from "$types/models/vehicle-report-general";
import { tauri } from "@tauri-apps/api";

const _prepare = (report: VehicleReportGeneralModel) => {
  const _r: VehicleReportGeneralModel = {
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

export const tauriGetVehicleReportGeneralAll = async () => {
  const reports = await tauri.invoke(
    "get_vehicle_report_general_all"
  );
  const r = vehicleReportGeneralModelSchema
    .array()
    .safeParse(reports);
  return (r.success ? r.data : []).map(_prepare);
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
  return r.success ? _prepare(r.data) : null;
};
