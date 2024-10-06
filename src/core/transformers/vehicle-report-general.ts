/** @format */

import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { VehicleModel } from "$types/models/vehicle";
import {
  VehicleReportGeneralEntry,
  VehicleReportGeneralExportData,
  VehicleReportGeneralFormData,
  VehicleReportGeneralModel,
} from "$types/models/vehicle-report-general";
import dayjs from "dayjs";

export const VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER = {
  toEntry: async (report: VehicleReportGeneralModel) => {
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      return null;
    }

    const entry: VehicleReportGeneralEntry = {
      datetime: report.datetime,
      id: report.id,
      title: report.title,
      topics: report.topics
        .normalize()
        .split(",")
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),

      vehicle_id: vehicle.id,
      vehicle_license_plate: vehicle.license_plate,
    };
    return entry;
  },

  toExportData: async (
    report: VehicleReportGeneralModel
  ) => {
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      return null;
    }

    const exportData: VehicleReportGeneralExportData = {
      รหัส: report.id,
      เรื่อง: report.title,
      รายละเอียด: report.content,
      วันที่ลงบันทึก: report.datetime,
      หัวข้อที่เกี่ยวข้อง: report.topics,

      รหัสรถรับส่ง: vehicle.id,
      เลขทะเบียน: vehicle.license_plate,
    };
    return exportData;
  },

  toFormData: (
    report: VehicleReportGeneralModel | undefined,
    vehicle: VehicleModel
  ) => {
    if (report === undefined) {
      const formData: VehicleReportGeneralFormData = {
        datetime: dayjs().locale("th").format(),
        title: "เรื่องร้องเรียนรถรับส่ง",
        content: "",
        topics: [],
        vehicle,
      };
      return formData;
    }
    let datetime = dayjs(report.datetime);
    if (!datetime.isValid()) {
      datetime = dayjs();
    }
    const formData = {
      vehicle,
      datetime: datetime.locale("th").format(),
      topics: report.topics
        .normalize()
        .split(",")
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),
      content: report.content.trim().normalize(),
      title: report.title.trim().normalize(),
    };
    return formData;
  },
};
