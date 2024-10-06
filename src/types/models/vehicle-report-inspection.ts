import dayjs from "dayjs";
import { z } from "zod";
import { VehicleModel } from "./vehicle";

export const vehicleReportInspectionModelSchema = z
  .object({
    id: z.number(),
    vehicle_id: z.number(),
    title: z.string().trim().min(1),
    datetime: z.string().refine((v) => dayjs(v).isValid()),

    topics: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    content: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    front_camera: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    overhead_fan: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    windows: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    seatbelts: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    seats: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    headlights: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    turn_signals: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    brake_light: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    frame: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    rearview_mirror: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    sideview_mirror: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    tires: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
  })
  .required();

export type VehicleReportInspectionModel = z.infer<
  typeof vehicleReportInspectionModelSchema
>;

export type VehicleReportInspectionFormData = Omit<
  VehicleReportInspectionModel,
  "id" | "vehicle_id" | "topics"
> & {
  topics: string[];
  vehicle: VehicleModel;
};

export type VehicleReportInspectionEntry = {
  id: number;
  title: string;
  vehicle_id: number;
  vehicle_license_plate: string;
  datetime: string;
  topics: string[];
};

export type VehicleReportInpsectionExportData = {
  รหัสรถรับส่ง: number;
  เลขทะเบียน: string;

  รหัส: number;
  ชื่อเรื่อง: string;

  วันที่ลงบันทึก: string;
  หมายเหตุ: string;
  หัวข้อที่เกี่ยวข้อง: string;

  กล้องหน้ารถ: string;
  พัดลม: string;
  หน้าต่าง: string;
  เข็มขัดนิรภัย: string;
  เบาะและที่นั่ง: string;
  ไฟหน้า: string;
  ไฟเลี้ยว: string;
  ไฟเบรค: string;
  ตัวรถ: string;
  กระจกมองข้าง: string;
  กระจกมองหลัง: string;
  ยางและล้อ: string;
};
