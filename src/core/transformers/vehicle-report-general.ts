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
      content: report.content,
      datetime: report.datetime,
      id: report.id,
      title: report.title,
      topics: report.topics,

      vehicle_id: vehicle.id,
      vehicle_license_plate: vehicle.license_plate,
    };
    return exportData;
  },

  toFormData: (
    report: VehicleReportGeneralModel | undefined,
    vehicle: VehicleModel
  ) => {
    let formData: VehicleReportGeneralFormData = {
      datetime: dayjs().format(),
      title: "",
      content: "",
      topics: [],
      vehicle,
    };
    if (report !== undefined) {
      formData = {
        ...report,
        topics: report.topics
          .split(",")
          .map((topic) => topic.trim().normalize())
          .filter((topic) => topic.length > 0),
        vehicle,
      };
    }
    return formData;
  },
};
