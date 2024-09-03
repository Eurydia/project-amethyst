import { DriverModel } from "./Driver";
import { PickupRouteModel } from "./PickupRoute";
import { VehicleModel } from "./Vehicle";

export type OperationalLogModel = {
	id: string;
	driver_id: string;
	vehicle_id: string;
	route_id: string;

	start_date: string | null;
	end_date: string | null;
};

export type OperationalLogEntry = {
	id: string;
	driverId: string;
	driverName: string;
	driverSurname: string;
	vehicleId: string;
	vehicleLicensePlate: string;
	routeId: string;
	routeName: string;

	startDate: string | null;
	endDate: string | null;
};

export type OperationalLogFormData = {
	driver: DriverModel | null;
	vehicle: VehicleModel | null;
	route: PickupRouteModel | null;

	startDate: string | null;
	endDate: string | null;
};

export type OperationalLog = {
	id: string;
	driverId: string;
	driverName: string;
	driverSurname: string;
	vehicleId: string;
	vehiclePlate: string;
	routeId: string;
	routeName: string;

	startDate: string | null;
	endDate: string | null;
};
