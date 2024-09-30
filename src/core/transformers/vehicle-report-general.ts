/** @format */

import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {} from "$types/models/vehicle";
import {
  VehicleReportGeneralEntry,
  VehicleReportGeneralExportData,
  VehicleReportGeneralModel,
} from "$types/models/vehicle-report-general";

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
};
