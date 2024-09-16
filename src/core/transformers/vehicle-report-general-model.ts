import { getVehicle } from "$backend/database/get";
import {} from "$types/models/vehicle";
import {
  VehicleReportGeneralEntry,
  VehicleReportGeneralModel,
} from "$types/models/vehicle-report-general";

export const VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER = {
  toVehicleReportGeneralEntry: async (
    report: VehicleReportGeneralModel,
  ) => {
    const vehicle = await getVehicle(report.vehicle_id);
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

      vehicleId: vehicle.id,
      vehicleLicensePlate: vehicle.license_plate,
    };
    return entry;
  },
};
