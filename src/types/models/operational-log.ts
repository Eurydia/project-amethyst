import dayjs from "dayjs";
import { z } from "zod";
import { DriverModel } from "./driver";
import { PickupRouteModel } from "./pickup-route";
import { VehicleModel } from "./vehicle";

export const operationalLogModelSchema = z
  .object({
    id: z.number().int(),
    driver_id: z.number().int(),
    vehicle_id: z.number().int(),
    route_id: z.number().int(),

    start_date: z
      .string()
      .refine((v) => dayjs(v).isValid()),
    end_date: z.string().refine((v) => dayjs(v).isValid()),
  })
  .required();

export type OperationalLogModel = z.infer<
  typeof operationalLogModelSchema
>;

export type OperationalLogFormData = Pick<
  OperationalLogModel,
  "start_date" | "end_date"
> & {
  driver: DriverModel;
  vehicle: VehicleModel;
  route: PickupRouteModel;
};

export type OperationalLogEntry = {
  id: number;
  driver_id: number;
  driver_name: string;
  driver_surname: string;

  vehicle_id: number;
  vehicle_license_plate: string;

  route_id: number;
  route_name: string;

  start_date: string;
  end_date: string;
};

export type OperationalLogExportData = {
  รหัส: number;
  วันที่เริ่มมีผล: string;
  วันที่หมดอายุ: string;

  รหัสคนขับรถ: number;
  ชื่อคนขับรถ: string;
  นามสกุลคนขับรถ: string;

  รหัสรถรับส่ง: number;
  เลขทะเบียน: string;

  รหัสสายรถ: number;
  ชื่อสาย: string;
};
