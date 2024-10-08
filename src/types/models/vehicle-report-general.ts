import dayjs from "dayjs";
import { z } from "zod";
import { VehicleModel } from "./vehicle";

export const vehicleReportGeneralModelSchema = z
  .object({
    id: z.number().int(),
    vehicle_id: z.number().int(),

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
  รหัสรถรับส่ง: number;
  เลขทะเบียน: string;

  รหัส: number;
  วันที่ลงบันทึก: string;
  เรื่อง: string;
  รายละเอียด: string;
  หัวข้อที่เกี่ยวข้อง: string;
};
