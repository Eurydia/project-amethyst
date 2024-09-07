import { DriverModel } from "./Driver";
import { PickupRouteModel } from "./PickupRoute";
import { VehicleModel } from "./Vehicle";

export type OperationalLogModel = {
	id: number;
	driver_id: number;
	vehicle_id: number;
	route_id: number;

	start_date: string;
	end_date: string;
};

export type OperationalLogEntry = {
	id: number;
	driverId: number;
	driverName: string;
	driverSurname: string;

	vehicleId: number;
	vehicleLicensePlate: string;

	routeId: number;
	routeName: string;

	startDate: string;
	endDate: string;
};

export type OperationalLogFormData = {
	driver: DriverModel;
	vehicle: VehicleModel;
	route: PickupRouteModel;

	startDate: string;
	endDate: string;
};

export type OperationalLog = {
	id: number;

	driverId: number;
	driverName: string;
	driverSurname: string;

	vehicleId: number;
	vehiclePlate: string;

	routeId: number;
	routeName: string;

	startDate: string | null;
	endDate: string | null;
};
