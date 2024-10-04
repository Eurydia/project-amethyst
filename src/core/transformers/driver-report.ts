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
      ...report,
      driver_name: driver.name,
      driver_surname: driver.surname,
      topics: report.topics.split(","),
    };
    return entry;
  },

  toFormData: (
    driver: DriverModel,
    report: DriverReportModel | undefined = undefined
  ) => {
    let formData: DriverReportFormData = {
      datetime: dayjs().format(),
      driver,
      title: "",
      content: "",
      topics: [],
    };
    if (report !== undefined) {
      let datetime = dayjs(report.datetime);
      if (!datetime.isValid()) {
        datetime = dayjs();
      }
      formData = {
        ...report,
        driver,
        datetime: datetime.format(),
        topics: report.topics.split(","),
      };
    }
    return formData;
  },

  toExportData: async (report: DriverReportModel) => {
    const driver = await tauriGetDriver(report.driver_id);
    if (driver === null) {
      return null;
    }
    const exportData: DriverReportExportData = {
      รหัสคนขับ: driver.id,
      ชื่อคนขับรถ: driver.name,
      นามสกุลคนขับรถ: driver.surname,
      รหัส: report.id,
      วันที่ลงบันทึก: report.datetime,
      เรื่อง: report.title,
      รายละเอียด: report.content,
      หัวข้อที่เกี่ยวข้อง: report.topics,
    };
    return exportData;
  },
};
