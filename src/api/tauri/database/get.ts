import {
	DriverModel,
	DriverReportModel,
	VehicleModel,
} from "$types/models";
import { fakerTH } from "@faker-js/faker";

let driverId = 0;
const drivers: DriverModel[] =
	fakerTH.helpers.multiple(
		() => {
			const id = driverId.toString();
			driverId++;
			return {
				current_pickup_route_id: "",
				current_vehicle_id: id,
				previous_vehicles: "",
				previous_pickup_routes: "",
				images: "",
				license_images: "",
				license_type:
					fakerTH.helpers.arrayElement([
						"ประเภท 1",
						"ประเภท 2",
						"ประเภท 3",
						"ประเภท 4",
					]),
				name: fakerTH.person.firstName(),
				surname: fakerTH.person.lastName(),
				contact: fakerTH.phone.number(),
				id: id,
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

const topics = fakerTH.word.words(100);
export const getTopicAll = async (): Promise<
	string[]
> => {
	return [...new Set(topics.split(" "))];
};

export const getDriverReportAll =
	async (): Promise<DriverReportModel[]> => {
		return [];
	};

export const getDriverReportWithDriverId = async (
	driverId: string,
) => {
	return [];
};

export const getDriverDrugTestAll =
	async (): Promise<DriverReportModel[]> => {
		return [];
	};

export const getDriverDrugTestWithDriverId =
	async (driverId: string) => {
		return [];
	};
