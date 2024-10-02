import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { VehicleReportInspectionFormData } from "$types/models/vehicle-report-inspection";
import dayjs from "dayjs";
import { z } from "zod";

const schema = z.object({
  vehicle_id: z.number().int(),
  datetime: z.string(),
  topics: z.string(),
  content: z.string(),
  front_camera: z.string(),
  overhead_fan: z.string(),
  windows: z.string(),
  seatbelts: z.string(),
  seats: z.string(),
  headlights: z.string(),
  turn_signals: z.string(),
  brake_light: z.string(),
  frame: z.string(),
  rearview_mirror: z.string(),
  sideview_mirror: z.string(),
  tires: z.string(),
});

export const VEHICLE_REPORT_INSPECTION_VALIDATOR = {
  validate: async (data: unknown) => {
    if (!schema.safeParse(data).success) {
      return null;
    }

    const data_ = data as z.infer<typeof schema>;

    const vehicle = await tauriGetVehicle(data_.vehicle_id);
    if (vehicle === null) {
      return null;
    }

    const datetime = dayjs(data_.datetime);
    if (!datetime.isValid()) {
      return null;
    }

    const formData: VehicleReportInspectionFormData = {
      vehicle,
      datetime: datetime.format(),

      content: data_.content.trim().normalize(),
      topics: data_.topics
        .split(",")
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0),

      front_camera: data_.front_camera.trim().normalize(),
      overhead_fan: data_.overhead_fan.trim().normalize(),
      windows: data_.windows.trim().normalize(),
      seatbelts: data_.seatbelts.trim().normalize(),
      seats: data_.seats.trim().normalize(),
      headlights: data_.headlights.trim().normalize(),
      turn_signals: data_.turn_signals.trim().normalize(),
      brake_light: data_.brake_light.trim().normalize(),
      frame: data_.frame.trim().normalize(),
      rearview_mirror: data_.rearview_mirror
        .trim()
        .normalize(),
      sideview_mirror: data_.sideview_mirror
        .trim()
        .normalize(),
      tires: data_.tires.trim().normalize(),
    };
    return formData;
  },
};
