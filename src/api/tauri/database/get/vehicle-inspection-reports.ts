import {
  VehicleReportInspectionModel,
  vehicleReportInspectionModelSchema,
} from "$types/models/vehicle-report-inspection";
import { tauri } from "@tauri-apps/api";

const _prepare = (report: VehicleReportInspectionModel) => {
  const _r: VehicleReportInspectionModel = {
    datetime: report.datetime,
    frame: report.frame.trim().normalize(),
    front_camera: report.front_camera.trim().normalize(),
    headlights: report.headlights.trim().normalize(),
    id: report.id,
    brake_light: report.brake_light.trim().normalize(),
    overhead_fan: report.overhead_fan.trim().normalize(),
    rearview_mirror: report.rearview_mirror
      .trim()
      .normalize(),
    seatbelts: report.seatbelts.trim().normalize(),
    seats: report.seats.trim().normalize(),
    sideview_mirror: report.sideview_mirror,
    tires: report.tires.trim().normalize(),
    turn_signals: report.turn_signals.trim().normalize(),
    vehicle_id: report.vehicle_id,
    windows: report.windows.trim().normalize(),
    content: report.content.trim().normalize(),
    topics: report.topics
      .split(",")
      .map((topic) => topic.trim().normalize())
      .filter((topic) => topic.length > 0)
      .join(","),
  };
  return _r;
};
export const tauriGetVehicleReportInspectionAll =
  async () => {
    const reports = await tauri.invoke(
      "get_vehicle_report_inspection_all"
    );
    const r = vehicleReportInspectionModelSchema
      .array()
      .safeParse(reports);
    return (r.success ? r.data : []).map(_prepare);
  };
export const tauriGetVehicleReportInspection = async (
  reportId: number
) => {
  const report = await tauri.invoke(
    "get_vehicle_report_inspection",
    {
      reportId,
    }
  );
  const r =
    vehicleReportInspectionModelSchema.safeParse(report);
  return r.success ? _prepare(r.data) : null;
};
