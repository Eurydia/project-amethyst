import { SnakeCaseToCamelCase } from "$types/generics";

export type VehicleModel = {
	id: number;

	license_plate: string;
	vendor: string;
	vehicle_class: string;
	registered_city: string;
};

export type VehicleFormData =
	SnakeCaseToCamelCase<Omit<VehicleModel, "id">>;

export type VehicleEntry = {
	id: number;
	licensePlate: string;

	drivers: {
		id: number;
		name: string;
		surname: string;
	}[];

	routes: {
		id: number;
		name: string;
	}[];
};
