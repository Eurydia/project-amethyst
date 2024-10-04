import dayjs from "dayjs";
import { z } from "zod";
import { VehicleModel } from "./vehicle";

export const vehicleReportInspectionModelSchema = z
  .object({
    id: z.number(),
    vehicle_id: z.number(),

    datetime: z.string().refine((v) => dayjs(v).isValid()),
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
  })
  .passthrough()
  .required();

export type VehicleReportInspectionModel = z.infer<
  typeof vehicleReportInspectionModelSchema
>;

export type VehicleReportInspectionFormData = Omit<
  VehicleReportInspectionModel,
  "id" | "vehicle_id"
> & {
  vehicle: VehicleModel;
};

export type VehicleReportInspectionEntry = {
  id: number;
  inspection_round_number: number;
  vehicle_id: number;
  vehicle_license_plate: string;
  datetime: string;
  topics: string[];
};

export type VehicleReportInpsectionExportData = {
  รหัสรถรับส่ง: number;
  เลขทะเบียน: string;

  รหัส: number;
  รอบการตรวจสภาพ: number;

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
