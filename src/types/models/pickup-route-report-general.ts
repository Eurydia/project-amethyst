import dayjs from "dayjs";
import { z } from "zod";
import { PickupRouteModel } from "./pickup-route";

export const pickupRouteReportGeneralModelSchema = z
  .object({
    id: z.number().int(),
    route_id: z.number().int(),

    datetime: z.string().refine((v) => dayjs(v).isValid()),
    title: z
      .string()
      .trim()
      .min(1)
      .transform((v) => v.trim().normalize()),
    content: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    topics: z
      .string()
      .optional()
      .transform((v) =>
        (v ?? "")
          .normalize()
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v.length > 0)
          .join(",")
      ),
  })
  .required();

export type PickupRouteReportGeneralModel = z.infer<
  typeof pickupRouteReportGeneralModelSchema
>;

export type PickupRouteReportGeneralFormData = Omit<
  PickupRouteReportGeneralModel,
  "topics" | "id"
> & {
  route: PickupRouteModel;
  topics: string[];
};

export type PickupRouteReportGeneralEntry = {
  datetime: string;
  routeName: string;
  routeId: number;
  id: number;
  title: string;
  topics: string[];
};

export type PickupRouteReportGeneralExportData = {
  ชื่อสายรถ: string;
  รหัสสายรถ: number;

  รหัส: number;
  วันที่ลงบันทึก: string;
  เรื่อง: string;
  รายละเอียด: string;
  หัวข้อที่เกี่ยวข้อง: string;
};
