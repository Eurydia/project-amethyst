export type DriverReportModel = {
	id: string;

	datetime_iso: string;
	title: string;
	content: string;
	topics: string;
	driver_id: string;
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
