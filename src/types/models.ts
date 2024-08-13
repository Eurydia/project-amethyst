export type DailyRecord = {
	id: string;

	datetime_iso: string;
	title: string;
	topics: string;
	details: string;
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
export type CheckupRecord = {
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

export type PickupRoute = {
	id: string;
	label: string;
	assigned_vehicle_ids: string;
};

export type Vehicle = {
	id: string;

	vendor_name: string;
	vehicle_class: string;
	license_plate: string;
	registered_city: string;
	images: string;
	vehicle_assigned_routes: string;
};

export type Driver = {
	id: string;

	images: string;
	name: string;
	surname: string;
	contact: string;
	liscense_images: string;
};
