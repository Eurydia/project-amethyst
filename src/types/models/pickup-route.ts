import dayjs from "dayjs";
import { z } from "zod";

export const pickupRouteModelSchema = z
  .object({
    id: z.number().int().min(1),
    name: z.string().trim().min(1),
    arrival_time: z
      .string()
      .refine((v) => dayjs(v, "HH:mm").isValid()),
    departure_time: z
      .string()
      .refine((v) => dayjs(v, "HH:mm").isValid()),
  })
  .passthrough()
  .required();

export type PickupRouteModel = z.infer<
  typeof pickupRouteModelSchema
>;

export type PickupRouteEntry = {
  id: number;
  name: string;

  vehicles: {
    id: number;
    licensePlate: string;
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
    เลขรหัส: z.number().int().min(1),
    ชื่อสาย: z.string().min(1),
    เวลารับเข้า: z.string(),
    เวลารับออก: z.string(),
  })
  .passthrough()
  .required();
export type PickupRouteExportData = z.infer<
  typeof pickupRouteExportDataSchema
>;
