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
      let formData: PickupRouteReportGeneralFormData = {
        route,
        datetime: dayjs().format(),
        title: "",
        content: "",
        topics: [],
      };
      if (report === undefined) {
        return formData;
      }
      formData = {
        content: report.content.trim().normalize(),
        datetime: dayjs(report.datetime).format(),
        title: report.title.trim().normalize(),
        topics: report.topics
          .split(",")
          .map((topic) => topic.trim().normalize())
          .filter((topic) => topic.length > 0),
        route,
      };
      return formData;
    },
  };
