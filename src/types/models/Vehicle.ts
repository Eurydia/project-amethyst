export type VehicleModel = {
	id: string;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
	images: string;
};

export type VehicleFormData = Omit<
	VehicleModel,
	"id" | "images"
>;
