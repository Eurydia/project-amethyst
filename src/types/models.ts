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
	vehiclePlate: string;
	routeId: string;
	routeName: string;

	startDate: string | null;
	endDate: string | null;
};

export type PickupRouteReport = {
	id: string;
	routeId: string;
	routeName: string;

	title: string;
	content: string;
	topics: string[];
	datetime: string;
};

export type VehicleModel = {
	id: string;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
	images: string;
};
