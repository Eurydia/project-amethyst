import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { VehicleModel } from "$types/models/vehicle";
import {
  VehicleReportInpsectionExportData,
  VehicleReportInspectionEntry,
  VehicleReportInspectionFormData,
  VehicleReportInspectionModel,
} from "$types/models/vehicle-report-inspection";
import dayjs from "dayjs";

export const VEHICLE_REPORT_INSPECTION_TRANSFORMER = {
  toEntry: async (report: VehicleReportInspectionModel) => {
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      return null;
    }

    const entry: VehicleReportInspectionEntry = {
      id: report.id,
      title: report.title,
      datetime: report.datetime,
      topics: report.topics.split(","),

      vehicle_id: vehicle.id,
      vehicle_license_plate: vehicle.license_plate,
    };
    return entry;
  },

  toExportDataSync: async (
    report: VehicleReportInspectionModel,
    vehicle: VehicleModel
  ) => {
    const exportData: VehicleReportInpsectionExportData = {
      ชื่อเรื่อง: report.title,
      รหัสรถรับส่ง: vehicle.id,

      เลขทะเบียน: vehicle.license_plate,
      รหัส: report.id,
      วันที่ลงบันทึก: dayjs(report.datetime)
        .locale("th")
        .format(),
      หมายเหตุ: report.content,
      หัวข้อที่เกี่ยวข้อง: report.topics
        .split(",")
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0)
        .join(", "),
      กล้องหน้ารถ: report.front_camera,
      พัดลม: report.overhead_fan,
      หน้าต่าง: report.windows,
      เข็มขัดนิรภัย: report.seatbelts,
      เบาะและที่นั่ง: report.seats,
      ไฟหน้า: report.headlights,
      ไฟเลี้ยว: report.turn_signals,
      ไฟเบรค: report.brake_light,
      ตัวรถ: report.frame,
      กระจกมองข้าง: report.sideview_mirror,
      กระจกมองหลัง: report.rearview_mirror,
      ยางและล้อ: report.tires,
    };
    return exportData;
  },

  toExportData: async (
    report: VehicleReportInspectionModel
  ) => {
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      return null;
    }
    return VEHICLE_REPORT_INSPECTION_TRANSFORMER.toExportDataSync(
      report,
      vehicle
    );
  },

  toFormData: (
    report: VehicleReportInspectionModel | undefined,
    vehicle: VehicleModel
  ): VehicleReportInspectionFormData => {
    if (report === undefined) {
      const formData: VehicleReportInspectionFormData = {
        vehicle,
        datetime: dayjs().locale("th").format(),
        topics: [],
        title: "",
        brake_light: "",
        content: "",
        frame: "",
        front_camera: "",
        headlights: "",
        overhead_fan: "",
        rearview_mirror: "",
        seatbelts: "",
        seats: "",
        sideview_mirror: "",
        tires: "",
        windows: "",
        turn_signals: "",
      };
      return formData;
    }

    let datetime = dayjs(report.datetime);
    if (!datetime.isValid()) {
      datetime = dayjs();
    }
    const formData: VehicleReportInspectionFormData = {
      vehicle,
      datetime: datetime.locale("th").format(),
      topics: report.topics
        .split(",")
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),

      title: report.title,
      content: report.content,
      brake_light: report.brake_light,
      frame: report.frame,
      front_camera: report.front_camera,
      headlights: report.headlights,
      overhead_fan: report.overhead_fan,
      rearview_mirror: report.rearview_mirror,
      seatbelts: report.seatbelts,
      seats: report.seats,
      sideview_mirror: report.sideview_mirror,
      tires: report.tires,
      turn_signals: report.turn_signals,
      windows: report.windows,
    };
    return formData;
  },
};
