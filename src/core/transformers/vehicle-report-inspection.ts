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
      inspection_round_number: 0, // FIXME

      id: report.id,
      datetime: report.datetime,
      topics: report.topics.split(","),

      vehicle_id: vehicle.id,
      vehicle_license_plate: vehicle.license_plate,
    };
    return entry;
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
    const exportData: VehicleReportInpsectionExportData = {
      รหัสรถรับส่ง: vehicle.id,
      เลขทะเบียน: vehicle.license_plate,
      รหัส: report.id,
      รอบการตรวจสภาพ: 0, // FIXME
      วันที่ลงบันทึก: dayjs(report.datetime)
        .locale("th")
        .format(),
      หมายเหตุ: report.content,
      หัวข้อที่เกี่ยวข้อง: report.topics,
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

  toFormData: (
    report: VehicleReportInspectionModel | undefined,
    vehicle: VehicleModel
  ): VehicleReportInspectionFormData => {
    let formData: VehicleReportInspectionFormData = {
      vehicle,
      datetime: dayjs().locale("th").format(),
      topics: [],
      content: "",
      front_camera: "",
      overhead_fan: "",
      windows: "",
      seatbelts: "",
      seats: "",
      headlights: "",
      turn_signals: "",
      brake_light: "",
      frame: "",
      rearview_mirror: "",
      sideview_mirror: "",
      tires: "",
    };
    if (report === undefined) {
      return formData;
    }

    let datetime = dayjs(report.datetime);
    if (!datetime.isValid()) {
      datetime = dayjs();
    }
    formData = {
      ...report,
      vehicle,
      datetime: datetime.locale("th").format(),
      topics: report.topics.split(","),
    };
    return formData;
  },
};
