export type RecordModel = {
	id: string;

	datetime_iso: string;
	title: string;
	topics: string;
};

export type DriverReportModel = {
	id: string;
	datetime_iso: string;
	title: string;
	content: string;

	driver_id: string;
	driver_name: string;
	driver_surname: string;

	// This field is intentionally left out to avoid outdated contact information.
	// driver_contact: string;

	// // (Optional) Satellite data
	// vehicle_id: string;
	// vehicle_vendor: string;
	// vehicle_class: string;
	// vehicle_license_plate: string;
	// vehicle_registered_city: string;
};

// The model is intended to act as a snapshot of the travel record.
// Since the relevant information can change over time, this model contains the information at the time of the travel record rather than storing the route, driver and vehicle ids.
export type TravelSnapshotRecordModel = {
	id: string;
	date_iso: string;
	arrival_time: string;
	departure_time: string;

	route_name: string;
	route_expected_arrival_time: string;
	route_expected_departure_time: string;

	vehicle_id: string;
	vehicle_vendor: string;
	vehicle_class: string;
	vehicle_license_plate: string;
	vehicle_registered_city: string;

	driver_id: string;
	driver_name: string;
	driver_surname: string;
};

export type VehicleClaimRecord = {
	id: string;

	vehicle_id: string;

	datetime_iso: string;
	title: string;
	topics: string;
	details: string;
};

// This model is a snapshot of the driver's and vehicle's information at the time of the checkup. Since the driver and vehicle information can change over time, storing the driver and vehicle ids might not be enough to reconstruct the checkup record.
export type CheckupSnapshotRecordModel = {
	id: string;
	datetime: string;
	report: string;

	vehicle_vendor_name: string;
	vehicle_type: string;
	vehicle_plate: string;
	vehicle_registered_city: string;
	vehicle_images: string;
	vehicle_assigned_route_id: string;

	driver_name: string;
	driver_surname: string;
	dirver_images: string;
	driver_phone_number: string;
	driver_driving_license_images: string;
};

export type PickupRouteModel = {
	id: string;
	name: string;
	arrival_time: string;
	departure_time: string;

	assigned_vehicle_ids: string;
};

export type VehicleModel = {
	id: string;

	vendor: string;
	vehicle_class: string;
	license_plate: string;
	registered_city: string;
	images: string;

	current_pickup_route: string;
	current_driver: string;

	previous_pickup_routes: string;
	previous_drivers: string;
};

export type DriverModel = {
	id: string;

	images: string;
	name: string;
	surname: string;
	contact: string;
	license_images: string;

	// (Optional) Satellite data linked to the driver
	current_vehicle: string;
	current_pickup_route: string;

	// (Optional) Historical data linked to the driver
	previous_vehicles: string;
	previous_pickup_routes: string;
};
