/** @format */

import { tauriGetDriver } from "$backend/database/get/drivers";
import { DriverModel } from "$types/models/driver";
import {
  DriverReportEntry,
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
      datetime: report.datetime,
      id: report.id,
      title: report.title,
      topics: report.topics.split(","),

      driverId: driver.id,
      driverName: driver.name,
      driverSurname: driver.surname,
    };
    return entry;
  },

  toFormData: (
    report: DriverReportModel | undefined,
    driver: DriverModel
  ) => {
    let formData: DriverReportFormData = {
      datetime: dayjs().format(),
      driver,
      title: "",
      content: "",
      topics: [],
    };
    if (report !== undefined) {
      formData = {
        ...report,
        topics: report.topics
          .split(",")
          .map((topic) => topic.trim().normalize())
          .filter((topic) => topic.length > 0),
        driver,
      };
    }
    return formData;
  },
};
