import dayjs from "dayjs";
import { z } from "zod";

export const attendanceLogModelSchema = z
  .object({
    id: z.number().int(),
    driver_id: z.number().int(),
    vehicle_id: z.number().int(),
    route_id: z.number().int(),

    expected_arrival_datetime: z
      .string()
      .refine((v) => dayjs(v).isValid()),
    expected_departure_datetime: z
      .string()
      .refine((v) => dayjs(v).isValid()),
    actual_arrival_datetime: z
      .string()
      .nullable()
      .refine((v) => v === null || dayjs(v).isValid()),
    actual_departure_datetime: z
      .string()
      .nullable()
      .refine((v) => v === null || dayjs(v).isValid()),
  })
  .passthrough()
  .required();

export type AttendanceLogModel = z.infer<
  typeof attendanceLogModelSchema
>;

export type AttendanceLogFormData = Omit<
  AttendanceLogModel,
  "id"
>;

export type AttendanceLogEntry = {
  id: number;
  vehicle_id: number;
  driver_id: number;
  route_id: number;

  driver_name: string;
  driver_surname: string;
  vehicle_license_plate: string;
  route_name: string;

  expected_arrival_datetime: string;
  expected_departure_datetime: string;

  actual_arrival_datetime: string | null;
  actual_departure_datetime: string | null;
};

export type AttendanceLogExportData = {
  รหัส: number;
  รหัสคนขับรถ: number;
  รหัสรถรับส่ง: number;
  รหัสสายรถ: number;

  ชื่อคนขับรถ: string;
  นามสกุลคนขับรถ: string;
  เลขทะเบียนรถ: string;
  ชื่อสายรถ: string;

  วันที่: string;

  เวลารับเข้าตามกำหนด: string;
  เวลารับออกตามกำหนด: string;

  เวลารับเข้าจริง: string;
  เวลารับออกจริง: string;

  สถานะรับเข้า: string;
  รับออกสาย: string;
};
