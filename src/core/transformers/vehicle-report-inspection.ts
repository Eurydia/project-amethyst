/** @format */

import { tauriGetVehicleReportInspectionAll } from "$backend/database/get/vehicle-inspection-reports";
import { tauriGetVehicle } from "$backend/database/get/vehicles";
import {} from "$types/models/vehicle";
import {
  VehicleReportInpsectionExportData,
  VehicleReportInspectionEntry,
  VehicleReportInspectionModel,
} from "$types/models/vehicle-report-inspection";

export const VEHICLE_REPORT_INSPECTION_TRANSFORMER = {
  toEntry: async (report: VehicleReportInspectionModel) => {
    const vehicle = await tauriGetVehicle(
      report.vehicle_id
    );
    if (vehicle === null) {
      return null;
    }

    const reports = (
      await tauriGetVehicleReportInspectionAll()
    )
      .filter(({ vehicle_id }) => vehicle_id === vehicle.id)
      .toReversed();

    let count = 0;
    for (const report of reports) {
      if (report.vehicle_id === vehicle.id) {
        count++;
      }
      if (report.id === report.id) {
        break;
      }
    }
    const entry: VehicleReportInspectionEntry = {
      inspection_round_number: count,

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
      ...report,
      vehicle_license_plate: vehicle.license_plate,
    };
    return exportData;
  },
};
