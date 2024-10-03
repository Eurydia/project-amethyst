import { z } from "zod";
import { PickupRouteModel } from "./pickup-route";

export const pickupRouteReportGeneralModelSchema = z
  .object({
    id: z.number().int().min(1),
    route_id: z.number().int().min(1),
    datetime: z.string(),
    title: z.string().min(1),
    content: z.string(),
    topics: z.string(),
  })
  .passthrough()
  .required();

export type PickupRouteReportGeneralModel = z.infer<
  typeof pickupRouteReportGeneralModelSchema
>;

export type PickupRouteReportGeneralEntry = {
  datetime: string;
  routeName: string;
  routeId: number;
  id: number;
  title: string;
  topics: string[];
};

export type PickupRouteReportGeneralFormData = {
  route: PickupRouteModel;
  datetime: string;
  title: string;
  content: string;
  topics: string[];
};

export type PickupRouteReportGeneralExportData = {
  ชื่อสายรถ: string;
  รหัสสายรถ: number;

  รหัสเรื่องร้องเรียน: number;
  วันที่ลงบันทึก: string;
  เรื่อง: string;
  รายละเอียด: string;
  หัวข้อที่เกี่ยวข้อง: string;
};
