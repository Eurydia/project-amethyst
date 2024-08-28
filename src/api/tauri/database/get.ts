import {
	DriverModel,
	DriverReportModel,
	PickupRouteModel,
	VehicleModel,
} from "$types/models";
import { fakerTH } from "@faker-js/faker";
import dayjs from "dayjs";

let driverId = 0;
const drivers: DriverModel[] =
	fakerTH.helpers.multiple(
		() => {
			const id = driverId.toString();
			driverId++;
			return {
				images: "",
				license_images: "",
				license_type:
					fakerTH.helpers.arrayElement([
						"ท.1",
						"ท.2",
					]),
				name: fakerTH.person.firstName(),
				surname: fakerTH.person.lastName(),
				contact: fakerTH.phone.number(),
				id: id,
			};
		},
		{ count: 20 },
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

const topics = fakerTH.word.words(10);
export const getTopicAll = async (): Promise<
	string[]
> => {
	return [...new Set(topics.split(" "))];
};

let driverGeneralReportId = 0;
const driverGeneralReports: DriverReportModel[] =
	fakerTH.helpers
		.multiple(
			() => {
				const id =
					driverGeneralReportId.toString();
				driverGeneralReportId++;
				return fakerTH.helpers.multiple(
					() => ({
						datetime_iso: dayjs(
							fakerTH.date.past(),
						).format(),
						title: fakerTH.lorem.sentence(),
						content: fakerTH.lorem.paragraph(),
						topics: fakerTH.helpers
							.arrayElements(topics.split(" "), 3)
							.join(","),
						driver_id:
							driverGeneralReportId.toString(),
						id,
					}),
					{ count: 3 },
				);
			},
			{
				count: 10,
			},
		)
		.flat();

export const getDriverGeneralReportAll =
	async (): Promise<DriverReportModel[]> => {
		return driverGeneralReports;
	};

export const getDriverGeneralReportAllWithDriverId =
	async (
		driverId: string,
	): Promise<DriverReportModel[]> => {
		return driverGeneralReports.filter(
			(entry) => entry.driver_id === driverId,
		);
	};

export const getDriverGeneralReportWithId =
	async (
		reportId: string,
	): Promise<DriverReportModel | null> => {
		for (const report of driverGeneralReports) {
			if (report.id === reportId) {
				return report;
			}
		}
		return null;
	};

let driverMedicalReportId = 0;
const driverMedicalReports: DriverReportModel[] =
	fakerTH.helpers.multiple(
		() => {
			const id = driverMedicalReportId.toString();
			driverMedicalReportId++;
			return {
				datetime_iso: dayjs(
					fakerTH.date.past(),
				).format(),
				title: fakerTH.lorem.sentence(),
				content: fakerTH.lorem.paragraph(),
				topics: fakerTH.helpers
					.arrayElements(topics.split(" "), 3)
					.join(","),
				driver_id: (
					driverMedicalReportId % 10
				).toString(),
				id,
			};
		},
		{
			count: 10,
		},
	);

export const getDriverMedicalReportAll =
	async (): Promise<DriverReportModel[]> => {
		return driverMedicalReports;
	};

export const getDriverMedicalReportAllWithDriverId =
	async (
		driverId: string,
	): Promise<DriverReportModel[]> => {
		return driverMedicalReports.filter(
			(entry) => entry.driver_id === driverId,
		);
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
