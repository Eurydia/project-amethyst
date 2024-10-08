import {
  CITIES,
  KNOWN_VEHICLE_CLASSES,
} from "$core/constants";
import { z } from "zod";

export const vehicleModelSchema = z
  .object({
    id: z.number().int(),
    license_plate: z
      .string()
      .trim()
      .min(1)
      .transform((v) => v.trim().normalize()),
    vendor: z
      .string()
      .trim()
      .min(1)
      .transform((v) => v.trim().normalize()),
    vehicle_class: z.enum(KNOWN_VEHICLE_CLASSES),
    registered_city: z.enum(CITIES),
  })
  .required();

export type VehicleModel = z.infer<
  typeof vehicleModelSchema
>;

export type VehicleFormData = Omit<VehicleModel, "id">;

export type VehicleEntry = {
  id: number;
  license_plate: string;

  drivers: {
    id: number;
    name: string;
    surname: string;
  }[];

  routes: {
    id: number;
    name: string;
  }[];
};

export const VehicleExportDataSchema = z
  .object({
    "รหัส": z.number().int(),
    "เลขทะเบียน": z
      .string()
      .min(1)
      .transform((v) => v.trim().normalize()),
    "หจก.": z
      .string()
      .min(1)
      .transform((v) => v.trim().normalize()),
    "ประเภทรถ": z.enum(KNOWN_VEHICLE_CLASSES),
    "จังหวัดที่จดทะเบียน": z.enum(CITIES),
  })
  .required();

export type VehicleExportData = z.infer<
  typeof VehicleExportDataSchema
>;
