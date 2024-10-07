import dayjs from "dayjs";
import { z } from "zod";

export const pickupRouteModelSchema = z
  .object({
    id: z.number().int(),

    name: z
      .string()
      .trim()
      .min(1)
      .transform((v) => v.trim().normalize()),
    arrival_time: z
      .string()
      .refine((v) => dayjs(v, "HH:mm").isValid()),
    departure_time: z
      .string()
      .refine((v) => dayjs(v, "HH:mm").isValid()),
  })
  .required();

export type PickupRouteModel = z.infer<
  typeof pickupRouteModelSchema
>;

export type PickupRouteEntry = {
  id: number;
  name: string;

  vehicles: {
    id: number;
    license_plate: string;
  }[];

  drivers: {
    id: number;
    name: string;
    surname: string;
  }[];
};

export type PickupRouteFormData = {
  name: string;
  arrival_time: string;
  departure_time: string;
};

export const pickupRouteExportDataSchema = z
  .object({
    รหัส: z.number().int().min(1),
    ชื่อสาย: z
      .string()
      .trim()
      .min(1)
      .transform((v) => v.trim().normalize()),
    เวลารับเข้า: z
      .string()
      .refine((v) => dayjs(v, "HH:mm").isValid()),
    เวลารับออก: z
      .string()
      .refine((v) => dayjs(v, "HH:mm").isValid()),
  })
  .required();
export type PickupRouteExportData = z.infer<
  typeof pickupRouteExportDataSchema
>;
