import { tauriGetDriver } from "$backend/database/get/drivers";
import { DriverReportFormData } from "$types/models/driver-report";
import dayjs from "dayjs";
import { z } from "zod";

const schema = z.object({
  driver_id: z.number().int(),
  datetime: z.string(),
  title: z.string().min(1),
  content: z.string(),
  topics: z.string(),
});

export const DRIVER_REPORT_VALIDATOR = {
  validate: async (data: unknown) => {
    if (!schema.safeParse(data).success) {
      return null;
    }

    const data_ = data as z.infer<typeof schema>;
    const driver = await tauriGetDriver(data_.driver_id);
    if (driver === null) {
      return null;
    }

    const datetime = dayjs(data_.datetime);
    if (!datetime.isValid()) {
      return null;
    }
    const formData: DriverReportFormData = {
      driver,
      title: data_.title.normalize().trim(),
      datetime: datetime.format(),
      content: data_.content.normalize().trim(),
      topics: data_.topics
        .split(",")
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0),
    };
    return formData;
  },
};
