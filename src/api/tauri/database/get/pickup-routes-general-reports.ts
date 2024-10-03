import {
  PickupRouteReportGeneralModel,
  pickupRouteReportGeneralModelSchema,
} from "$types/models/pickup-route-report-general";
import { tauri } from "@tauri-apps/api";

const _prepare = (
  report: PickupRouteReportGeneralModel
) => {
  const _r: PickupRouteReportGeneralModel = {
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

export const tauriGetPickupRouteReportGeneralAll =
  async () => {
    const reports = await tauri.invoke(
      "get_pickup_route_report_general_all"
    );
    const r = pickupRouteReportGeneralModelSchema
      .array()
      .safeParse(reports);
    return (r.success ? r.data : []).map(_prepare);
  };
export const tauriGetPickupRouteReportGeneral = async (
  reportId: number
) => {
  const report = await tauri.invoke(
    "get_pickup_route_report_general",
    {
      reportId,
    }
  );
  const r =
    pickupRouteReportGeneralModelSchema.safeParse(report);
  return r.success ? _prepare(r.data) : null;
};
