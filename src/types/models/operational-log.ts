import { z } from "zod";
import { DriverModel } from "./driver";
import { PickupRouteModel } from "./pickup-route";
import { VehicleModel } from "./vehicle";

export const operationalLogModelSchema = z
  .object({
    id: z.number().int().min(1),
    driver_id: z.number().int().min(1),
    vehicle_id: z.number().int().min(1),
    route_id: z.number().int().min(1),

    start_date: z.string(),
    end_date: z.string(),
  })
  .passthrough()
  .required();

export type OperationalLogModel = z.infer<
  typeof operationalLogModelSchema
>;

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

export type OperationalLogFormData = {
  driver: DriverModel;
  vehicle: VehicleModel;
  route: PickupRouteModel;

  start_date: string;
  end_date: string;
};

export type OperationalLogExportData = {
  รหัส: number;

  รหัสคนขับรถ: number;
  ชื่อคนขับรถ: string;
  นามสกุลคนขับรถ: string;

  รหัสรถรับส่ง: number;
  เลขทะเบียน: string;

  รหัสสายรถ: number;
  ชื่อสาย: string;

  วันที่เริ่มมีผล: string;
  วันที่หมดอายุ: string;
};
