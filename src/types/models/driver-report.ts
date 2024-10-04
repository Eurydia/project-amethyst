import dayjs from "dayjs";
import { z } from "zod";
import { DriverModel } from "./driver";

export const driverReportModelSchema = z
  .object({
    id: z.number().int(),
    driver_id: z.number().int(),

    datetime: z.string().refine((v) => dayjs(v).isValid()),
    title: z.string().trim().min(1),
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

  driver_id: number;
  driver_name: string;
  driver_surname: string;
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
