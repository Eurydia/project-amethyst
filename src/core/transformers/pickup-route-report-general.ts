import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { PickupRouteModel } from "$types/models/pickup-route";
import {
  PickupRouteReportGeneralEntry,
  PickupRouteReportGeneralExportData,
  PickupRouteReportGeneralFormData,
  PickupRouteReportGeneralModel,
} from "$types/models/pickup-route-report-general";
import dayjs from "dayjs";

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
        id: report.id,
        datetime: dayjs(report.datetime)
          .locale("th")
          .format("YYYY-MM-DD HH:mm:ss"),
        title: report.title.trim().normalize(),
        topics: report.topics
          .split(",")
          .map((topic) => topic.trim().normalize())
          .filter((topic) => topic.length > 0),

        routeId: route.id,
        routeName: route.name.trim().normalize(),
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

    toFormData: (
      report: PickupRouteReportGeneralModel | undefined,
      route: PickupRouteModel
    ) => {
      if (report === undefined) {
        const formData: PickupRouteReportGeneralFormData = {
          route,
          datetime: dayjs().locale("th").format(),
          title: "เรื่องร้องเรียนสายรถ",
          content: "",
          topics: [],
        };
        return formData;
      }
      let datetime = dayjs(report.datetime);
      if (!datetime.isValid()) {
        datetime = dayjs();
      }
      const formData: PickupRouteReportGeneralFormData = {
        route,
        datetime: datetime.format(),
        title: report.title.normalize().trim(),
        content: report.content.normalize().trim(),
        topics: report.topics
          .normalize()
          .split(",")
          .map((topic) => topic.trim())
          .filter((topic) => topic.length > 0),
      };
      return formData;
    },
  };
