import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { VehicleReportGeneralFormData } from "$types/models/vehicle-report-general";
import dayjs from "dayjs";
import { z } from "zod";

const schema = z.object({
  vehicle_id: z.number().int(),
  datetime: z.string(),
  title: z.string().min(1),
  content: z.string(),
  topics: z.string(),
});

export const VEHICLE_REPORT_GENERAL_VALIDATOR = {
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

    const formData: VehicleReportGeneralFormData = {
      vehicle,
      datetime: datetime.format(),
      title: data_.title.normalize().trim(),
      content: data_.content.trim().normalize(),
      topics: data_.topics
        .split(",")
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0),
    };
    return formData;
  },
};
