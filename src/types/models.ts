export type DailyRecord = {
	datetime: string;
	title: string;
	topics: string;
	short_description: string;
	details: string;
};

export type CheckupRecord = {
	datetime_iso: string;
	recorded_issues: string;

	vehicle_vendor_name: string;
	vehicle_type: string;
	vehicle_plate: string;
	vehicle_registered_province: string;
	vehicle_images: string;
	vehicle_route_name: string;

	driver_full_name: string;
	dirver_images: string;
	driver_phone_number: string;
	driver_driving_license_images: string;
};
