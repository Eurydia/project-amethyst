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
  vehicleId: number;
  vehicleLicensePlate: string;

  driverId: number;
  driverName: string;
  driverSurname: string;

  routeId: number;
  routeName: string;

  expectedArrivalDatetime: string;
  actualArrivalDatetime: string | null;

  expectedDepartureDatetime: string;
  actualDepartureDatetime: string | null;
};
