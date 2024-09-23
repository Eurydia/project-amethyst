/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import {
  PickupRouteReportGeneralEntry,
  PickupRouteReportGeneralExportData,
  PickupRouteReportGeneralModel,
} from "$types/models/pickup-route-report-general";

export const PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER = {
  toPickupRouteReportGeneralEntry: async (
    report: PickupRouteReportGeneralModel
  ) => {
    const route = await tauriGetPickupRoute(report.route_id);
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

  toPickupRouteReportExportData: async (
    report: PickupRouteReportGeneralModel
  ) => {
    const route = await tauriGetPickupRoute(report.route_id);
    if (route === null) {
      return null;
    }

    const data: PickupRouteReportGeneralExportData = {
      ชื่อสายรถ: route.name,
      รหัสสายรถ: report.route_id,
      วันที่ลงบันทึก: report.datetime,
      เรื่อง: report.title,
      รายละเอียด: report.content,
      หัวข้อที่เกี่ยวข้อง: report.topics,
    };
    return data;
  },
};
