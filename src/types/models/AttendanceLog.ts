import { DriverModel } from "./Driver";
import { PickupRouteModel } from "./PickupRoute";
import { VehicleModel } from "./Vehicle";

export type AttendanceLogModel = {
	id: number;
	driver_id: number;
	vehicle_id: number;
	route_id: number;

	expected_arrival_datetime: string;
	actual_arrival_datetime: string | null;

	expected_departure_datetime: string;
	actual_departure_datetime: string | null;
};

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
	actualArrivalDatetime: string;

	expectedDepartureDatetime: string;
	actualDepartureDatetime: string;
};
