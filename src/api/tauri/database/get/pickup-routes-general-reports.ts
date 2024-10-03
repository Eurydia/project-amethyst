import { pickupRouteReportGeneralModelSchema } from "$types/models/pickup-route-report-general";
import { tauri } from "@tauri-apps/api";

export const tauriGetPickupRouteReportGeneralAll =
  async () => {
    const reports = await tauri.invoke(
      "get_pickup_route_report_general_all"
    );
    const r = pickupRouteReportGeneralModelSchema
      .array()
      .safeParse(reports);
    return r.success ? r.data : [];
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
  return r.success ? r.data : null;
};
