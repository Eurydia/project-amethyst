import dayjs from "dayjs";
import { z } from "zod";
import { VehicleModel } from "./vehicle";

export const vehicleReportInspectionModelSchema = z
  .object({
    id: z.number().int().min(1),
    vehicle_id: z.number().int().min(1),
    title: z
      .string()
      .trim()
      .min(1)
      .transform((v) => v.trim().normalize()),
    datetime: z.string().refine((v) => dayjs(v).isValid()),

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
    content: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    front_camera: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    overhead_fan: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    windows: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    seatbelts: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    seats: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    headlights: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    turn_signals: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    brake_light: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    frame: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    rearview_mirror: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    sideview_mirror: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
    tires: z
      .string()
      .optional()
      .transform((v) => (v ?? "").trim().normalize()),
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
  รหัส: number;
  ชื่อเรื่อง: string;

  รหัสรถรับส่ง: number;
  เลขทะเบียน: string;

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
