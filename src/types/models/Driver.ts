import { KNOWN_LICENSE_TYPES } from "$core/constants";
import { z } from "zod";

export const driverModelSchema = z
  .object({
    id: z.number().int().min(1),

    name: z.string().trim().min(1),
    surname: z.string().trim().min(1),
    contact: z.string(),
    license_type: z.enum(KNOWN_LICENSE_TYPES),
  })
  .required()
  .passthrough();

export type DriverModel = z.infer<typeof driverModelSchema>;

export type DriverEntry = {
  id: number;
  name: string;
  surname: string;

  vehicles: {
    id: number;
    licensePlate: string;
  }[];

  routes: {
    id: number;
    name: string;
  }[];
};

export type DriverFormData = Omit<DriverModel, "id">;

export const driverExportDataSchema = z
  .object({
    ชื่อ: z.string().min(1),
    นามสกุล: z.string().min(1),
    เบอร์ติดต่อ: z.string(),
    ประเภทใบขับขี่: z.enum(KNOWN_LICENSE_TYPES),
  })
  .passthrough()
  .required();

export type DriverExportData = z.infer<
  typeof driverExportDataSchema
>;
