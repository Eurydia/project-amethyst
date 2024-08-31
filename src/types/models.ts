export type OperationalLogModel = {
	id: string;
	driver_id: string;
	vehicle_id: string;
	route_id: string;

	start_date: string | null;
	end_date: string | null;
};

export type OperationalLog = {
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

export type PickupRouteModel = {
	id: string;

	name: string;
	arrival_time: string;
	departure_time: string;
};

export type VehicleModel = {
	id: string;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
	images: string;
};

export type DriverModel = {
	id: string;

	name: string;
	surname: string;
	contact: string;
	license_type: "ท.1" | "ท.2";
	images: string; // Commas separated image paths
};

export type DriverReportModel = {
	id: string;
	driver_id: string;

	datetime: string;
	title: string;
	content: string;
	topics: string;
};

export type DriverReport = {
	id: string;
	driver_id: string;
	driver_name: string;
	driver_surname: string;

	datetime: string;
	title: string;
	content: string;
	topics: string[];
};
