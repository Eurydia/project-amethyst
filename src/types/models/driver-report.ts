import { z } from "zod";
import { DriverModel } from "./driver";

export const driverReportModelSchema = z
  .object({
    id: z.number().int().min(1),
    driver_id: z.number().int().min(1),

    datetime: z.string(),
    title: z.string().min(1),
    content: z.string(),
    topics: z.string(),
  })
  .passthrough()
  .required();

export type DriverReportModel = z.infer<
  typeof driverReportModelSchema
>;

export type DriverReportEntry = {
  id: number;
  datetime: string;
  title: string;
  topics: string[];

  driverId: number;
  driverName: string;
  driverSurname: string;
};
export type DriverReportFormData = {
  datetime: string;
  title: string;
  content: string;
  topics: string[];
  driver: DriverModel;
};

export type DriverReportExportData = {
  รหัสคนขับ: number;
  ชื่อคนขับรถ: string;
  นามสกุลคนขับรถ: string;

  รหัส: number;
  วันที่ลงบันทึก: string;
  เรื่อง: string;
  รายละเอียด: string;
  หัวข้อที่เกี่ยวข้อง: string;
};
