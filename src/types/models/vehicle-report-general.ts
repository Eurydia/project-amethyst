import { z } from "zod";
import { VehicleModel } from "./vehicle";

export const vehicleReportGeneralModelSchema = z
  .object({
    vehicle_id: z.number().int().min(1),
    id: z.number().int().min(1),
    datetime: z.string(),
    title: z.string().min(1),
    content: z.string(),
    topics: z.string(),
  })
  .passthrough()
  .required();

export type VehicleReportGeneralModel = z.infer<
  typeof vehicleReportGeneralModelSchema
>;

export type VehicleReportGeneralFormData = {
  datetime: string;
  title: string;
  content: string;
  topics: string[];
  vehicle: VehicleModel;
};

export type VehicleReportGeneralEntry = {
  id: number;
  datetime: string;
  title: string;
  topics: string[];

  vehicle_id: number;
  vehicle_license_plate: string;
};

export type VehicleReportGeneralExportData = {
  หมายเลขเรื่องร้องเรียน: number;
  วันที่ลงบันทึก: string;
  เรื่อง: string;
  รายละเอียด: string;
  หัวข้อที่เกี่ยวข้อง: string;

  หมายเลขรถรับส่ง: number;
  เลขทะเบียน: string;
};
