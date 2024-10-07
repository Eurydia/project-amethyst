import { KNOWN_LICENSE_TYPES } from "$core/constants";
import { z } from "zod";

export const driverModelSchema = z
  .object({
    id: z.number().int(),

    name: z.string().trim().min(1),
    surname: z.string().trim().min(1),
    contact: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    license_type: z.enum(KNOWN_LICENSE_TYPES),
  })
  .required()
  .readonly();

export type DriverModel = z.infer<typeof driverModelSchema>;
export type DriverFormData = Omit<DriverModel, "id">;

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

export const driverExportDataSchema = z
  .object({
    รหัส: z.number().int().min(1),
    ชื่อ: z.string().min(1),
    นามสกุล: z.string().min(1),
    เบอร์ติดต่อ: z
      .string()
      .optional()
      .transform((v) => v ?? ""),
    ประเภทใบขับขี่: z.enum(KNOWN_LICENSE_TYPES),
  })
  .required();

export type DriverExportData = z.infer<
  typeof driverExportDataSchema
>;
