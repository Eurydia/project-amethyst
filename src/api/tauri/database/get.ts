import {
	DriverModel,
	VehicleModel,
} from "$types/models";
import { fakerTH } from "@faker-js/faker";

let driverId = 0;
const drivers: DriverModel[] =
	fakerTH.helpers.multiple(
		() => {
			return {
				current_pickup_route: "",
				previous_vehicles: "",
				previous_pickup_routes: "",
				images: "",
				license_images: "",
				current_vehicle: driverId.toString(),
				name: fakerTH.person.firstName(),
				surname: fakerTH.person.lastName(),
				contact: fakerTH.phone.number(),
				id: (driverId++).toString(),
			};
		},
		{ count: 10 },
	);

let vehicleId = 0;
const vehicles: VehicleModel[] =
	fakerTH.helpers.multiple(
		() => {
			return {
				vendor: fakerTH.company.name(),
				vehicle_class: fakerTH.vehicle.type(),
				license_plate: fakerTH.vehicle.vrm(),
				registered_city: fakerTH.location.city(),
				images: "",
				current_pickup_route: "",
				current_driver: drivers[vehicleId].id,
				previous_pickup_routes: "",
				previous_drivers: "",
				id: (vehicleId++).toString(),
			};
		},
		{ count: 10 },
	);

export const getDriverAll = async (): Promise<
	DriverModel[]
> => drivers;

export const getDriverWithId = async (
	driverId: string,
): Promise<DriverModel | null> => {
	const driver = drivers.find(
		(driver) => driver.id === driverId,
	);

	if (driver === undefined) {
		return null;
	}

	return driver;
};

export const getVehicleAll = async (): Promise<
	VehicleModel[]
> => {
	return vehicles;
};

export const getVehicleWithId = async (
	vehicleId: string,
): Promise<VehicleModel | null> => {
	const vehicle = vehicles.find(
		(vehicle) => vehicle.id === vehicleId,
	);

	if (vehicle === undefined) {
		return null;
	}

	return vehicle;
};
