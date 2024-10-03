import { z } from "zod";
import { DriverModel } from "./driver";
import { PickupRouteModel } from "./pickup-route";
import { VehicleModel } from "./vehicle";

export const attendanceLogModelSchema = z
  .object({
    id: z.number().int(),
    driver_id: z.number().int(),
    vehicle_id: z.number().int(),
    route_id: z.number().int(),

    expected_arrival_datetime: z.string(),
    actual_arrival_datetime: z.string().optional(),

    expected_departure_datetime: z.string(),
    actual_departure_datetime: z.string().optional(),
  })
  .passthrough()
  .required();

export type AttendanceLogModel = z.infer<
  typeof attendanceLogModelSchema
>;

export type AttendanceLogFormData = {
  driver: DriverModel;
  vehicle: VehicleModel;
  route: PickupRouteModel;

  actualArrivalDatetime: string | null;
  actualDepartureDatetime: string | null;

  expectedArrivalDatetime: string;
  expectedDepartureDatetime: string;
};

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
