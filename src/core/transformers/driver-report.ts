import { tauriGetDriver } from "$backend/database/get/drivers";
import { DriverModel } from "$types/models/driver";
import {
  DriverReportEntry,
  DriverReportExportData,
  DriverReportFormData,
  DriverReportModel,
} from "$types/models/driver-report";
import dayjs from "dayjs";

export const DRIVER_REPORT_MODEL_TRANSFORMER = {
  toEntry: async (report: DriverReportModel) => {
    const driver = await tauriGetDriver(report.driver_id);
    if (driver === null) {
      return null;
    }
    const entry: DriverReportEntry = {
      driver_id: driver.id,
      driver_name: driver.name,
      driver_surname: driver.surname,
      id: report.id,
      topics: report.topics.split(","),
      datetime: report.datetime,
      title: report.title,
    };
    return entry;
  },

  toFormData: (
    report: DriverReportModel | undefined,
    driver: DriverModel
  ) => {
    if (report === undefined) {
      const formData: DriverReportFormData = {
        datetime: dayjs().format(),
        driver,
        title: "",
        content: "",
        topics: [],
      };
      return formData;
    }
    let datetime = dayjs(report.datetime);
    if (!datetime.isValid()) {
      datetime = dayjs();
    }
    const formData: DriverReportFormData = {
      driver,
      datetime: datetime.format(),
      title: report.title,
      content: report.content,
      topics: report.topics
        .split(",")
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0),
    };
    return formData;
  },

  toExportData: async (report: DriverReportModel) => {
    const driver = await tauriGetDriver(report.driver_id);
    if (driver === null) {
      return null;
    }
    const exportData: DriverReportExportData = {
      รหัส: report.id,
      รหัสคนขับ: driver.id,
      ชื่อคนขับรถ: driver.name,
      นามสกุลคนขับรถ: driver.surname,

      วันที่ลงบันทึก: report.datetime,
      เรื่อง: report.title,
      รายละเอียด: report.content,
      หัวข้อที่เกี่ยวข้อง: report.topics,
    };
    return exportData;
  },
};
