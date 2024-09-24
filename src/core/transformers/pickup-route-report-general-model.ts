import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import {
  PickupRouteReportGeneralEntry,
  PickupRouteReportGeneralExportData,
  PickupRouteReportGeneralModel,
} from "$types/models/pickup-route-report-general";

export const PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER =
  {
    toEntry: async (
      report: PickupRouteReportGeneralModel
    ) => {
      const route = await tauriGetPickupRoute(
        report.route_id
      );
      if (route === null) {
        return null;
      }
      const entry: PickupRouteReportGeneralEntry = {
        datetime: report.datetime,
        id: report.id,
        title: report.title,
        topics: report.topics.split(","),

        routeId: route.id,
        routeName: route.name,
      };
      return entry;
    },

    toExportData: async (
      report: PickupRouteReportGeneralModel
    ) => {
      const route = await tauriGetPickupRoute(
        report.route_id
      );
      if (route === null) {
        return null;
      }

      const data: PickupRouteReportGeneralExportData = {
        รหัสสายรถ: route.id,
        ชื่อสายรถ: route.name,

        รหัสเรื่องร้องเรียน: report.id,
        วันที่ลงบันทึก: report.datetime,
        เรื่อง: report.title,
        รายละเอียด: report.content,
        หัวข้อที่เกี่ยวข้อง: report.topics,
      };
      return data;
    },
  };
