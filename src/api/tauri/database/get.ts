import {
	DriverModel,
	DriverReportModel,
	PickupRouteModel,
	VehicleModel,
} from "$types/models";
import {
	fakerTH,
	fakerTR,
} from "@faker-js/faker";

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
						"1",
						"2",
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

export const getDriverGeneralReportAll =
	async (): Promise<DriverReportModel[]> => {
		return [];
	};

export const getDriverGeneralReportAllWithDriverId =
	async (driverId: string) => {
		return [];
	};

export const getDriverMedicalReportAll =
	async (): Promise<DriverReportModel[]> => {
		return [];
	};

export const getDriverMedicalReportAllWithDriverId =
	async (driverId: string) => {
		return [];
	};

let pickupRouteId = 0;
const pickupRoutes: PickupRouteModel[] =
	fakerTH.helpers.multiple(
		() => {
			const id = pickupRouteId.toString();
			pickupRouteId++;
			return {
				arrival_time: "08:00",
				departure_time: "17:00",
				assigned_vehicle_ids: "",
				name: fakerTH.location.city(),
				id,
			};
		},
		{
			count: 10,
		},
	);

export const getPickupRouteAll =
	async (): Promise<PickupRouteModel[]> => {
		return pickupRoutes;
	};
