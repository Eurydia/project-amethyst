import {
	DriverModel,
	DriverReportModel,
} from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import {
	PickupRouteModel,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import {
	VehicleModel,
	VehicleReportGeneralModel,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import { faker, fakerTH } from "@faker-js/faker";
import dayjs from "dayjs";

//#region Operational Log
let operationLogId = 0;
const operationLogs = fakerTH.helpers
	.multiple(
		() =>
			fakerTH.helpers.multiple(
				() =>
					({
						driver_id: fakerTH.number
							.int({
								min: 0,
								max: 10,
							})
							.toString(),
						vehicle_id: fakerTH.number
							.int({
								min: 0,
								max: 10,
							})
							.toString(),
						route_id: fakerTH.number
							.int({
								min: 0,
								max: 10,
							})
							.toString(),
						end_date: dayjs(
							fakerTH.date.future(),
						).format(),
						id: (operationLogId++).toString(),
						start_date: dayjs(
							fakerTH.date.past(),
						).format(),
					} as OperationalLogModel),
				{
					count: 3,
				},
			),
		{
			count: 10,
		},
	)
	.flat();

export const getOperationLogAll =
	async (): Promise<OperationalLogModel[]> => {
		return operationLogs;
	};

export const getOperationLogAllWithDriverId =
	async (driverId: string) => {
		return (await getOperationLogAll()).filter(
			(entry) => entry.driver_id === driverId,
		);
	};

export const getOperationLogAllWithRouteId =
	async (routeId: string) => {
		return (await getOperationLogAll()).filter(
			(entry) => entry.route_id === routeId,
		);
	};

export const getOperationLogAllWithVehicleId =
	async (vehicleId: string) => {
		return (await getOperationLogAll()).filter(
			(entry) => entry.vehicle_id === vehicleId,
		);
	};
//#endregion

//#region Driver
let driverId = 0;
const drivers = fakerTH.helpers.multiple(
	() =>
		({
			images: "",
			license_type: fakerTH.helpers.arrayElement([
				"ท.1",
				"ท.2",
			]),
			name: fakerTH.person.firstName(),
			surname: fakerTH.person.lastName(),
			contact: fakerTH.phone.number(),
			id: (driverId++).toString(),
		} as DriverModel),
	{ count: 10 },
);

export const getDriverAll = async () => {
	return drivers;
};

export const getDriver = async (
	driverId: string,
): Promise<DriverModel | null> => {
	const drivers = await getDriverAll();
	for (const driver of drivers) {
		if (driver.id === driverId) {
			return driver;
		}
	}
	return null;
};

export const getDriverMany = async (
	driverIds: Set<string>,
) => {
	const drivers = await getDriverAll();
	const collected: DriverModel[] = [];
	for (const driver of drivers) {
		if (driverIds.has(driver.id)) {
			collected.push(driver);
		}
	}
	return collected;
};
//#endregion

//#region Vehicle
let vehicleId = 0;
const vehicles = fakerTH.helpers.multiple(
	() =>
		({
			vendor: fakerTH.company.name(),
			vehicle_class: fakerTH.vehicle.type(),
			license_plate: fakerTH.vehicle.vrm(),
			registered_city: fakerTH.location.city(),
			images: "",
			id: (vehicleId++).toString(),
		} as VehicleModel),
	{ count: 10 },
);

export const getVehicleAll = async (): Promise<
	VehicleModel[]
> => {
	return vehicles;
};

export const getVehicle = async (
	vehicleId: string,
) => {
	const vehicles = await getVehicleAll();
	for (const vehicle of vehicles) {
		if (vehicle.id === vehicleId) {
			return vehicle;
		}
	}
	return null;
};

export const getVehicleMany = async (
	vehicleIds: Set<string>,
) => {
	const vehicles = await getVehicleAll();
	const collected: VehicleModel[] = [];
	for (const vehicle of vehicles) {
		if (vehicleIds.has(vehicle.id)) {
			collected.push(vehicle);
		}
	}
	return collected;
};
//#endregion

export const getVehicleReportGeneralAll =
	async () => {
		return [
			{
				content: fakerTH.lorem.paragraph(),
				datetime: dayjs(
					fakerTH.date.past(),
				).format(),
				id: "0",
				title: fakerTH.lorem.sentence(),
				topics: "",
				vehicle_id: "0",
			},
		] as VehicleReportGeneralModel[];
	};

export const getVehicleReportGeneralWithId =
	async (reportId: string) => {
		return {
			id: reportId,
			datetime: dayjs(
				fakerTH.date.past(),
			).format(),
			title: fakerTH.lorem.sentence(),
			content: fakerTH.lorem.paragraph(),
			topics: "",
			vehicle_id: fakerTH.number
				.int({
					min: 0,
					max: 10,
				})
				.toString(),
		} as VehicleReportGeneralModel;
	};

export const getVehicleReportGeneralAllWithVehicleId =
	async (vehicleId: string) => {
		return [
			{
				content: fakerTH.lorem.paragraph(),
				datetime: dayjs(
					fakerTH.date.past(),
				).format(),
				id: "0",
				title: fakerTH.lorem.sentence(),
				topics: "",
				vehicle_id: vehicleId,
			},
		] as VehicleReportGeneralModel[];
	};

export const getVehicleReportInspectionAllWithVehicleId =
	async (vehicleId: string) => {
		return [] as VehicleReportInspectionModel[];
	};

export const getVehicleReportInspectionWithId =
	async (reportId: string) => {
		return {
			frame: fakerTH.lorem.paragraph(),
			front_camera: fakerTH.lorem.sentence(),
			content: fakerTH.lorem.paragraph(),
			datetime: dayjs(
				fakerTH.date.past(),
			).format(),
			fan_overhead: fakerTH.lorem.sentence(),
			id: reportId,
			inspection_round_number: "1",
			brake_light: fakerTH.lorem.sentence(),
			headlights: fakerTH.lorem.sentence(),
			turn_signals: fakerTH.lorem.sentence(),
			rearview_mirror: fakerTH.lorem.sentence(),
			sideview_mirror: fakerTH.lorem.sentence(),
			seatbelts: fakerTH.lorem.sentence(),
			seats: fakerTH.lorem.sentence(),
			topics: "",
			vehicle_id: "0",
			windows: fakerTH.lorem.sentence(),
		} as VehicleReportInspectionModel;
	};

export const getVehicleReportInspectionAll =
	async () => {
		return [] as VehicleReportInspectionModel[];
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
						datetime: dayjs(
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
				datetime: dayjs(
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

//#region Pickup Route
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

export const getPickupRoute = async (
	routeId: string,
) => {
	const routes = await getPickupRouteAll();
	for (const route of routes) {
		if (route.id === routeId) {
			return route;
		}
	}
	return null;
};

export const getPickupRouteMany = async (
	routeIds: Set<string>,
) => {
	const routes = await getPickupRouteAll();
	const collected: PickupRouteModel[] = [];
	for (const route of routes) {
		if (routeIds.has(route.id)) {
			collected.push(route);
		}
	}
	return collected;
};
//#endregion

let routeGeneralReportId = 0;
const routeGeneralReport: PickupRouteReportModel[] =
	fakerTH.helpers
		.multiple(
			() => {
				const id =
					routeGeneralReportId.toString();
				routeGeneralReportId++;
				return fakerTH.helpers.multiple(
					() =>
						({
							datetime: dayjs(
								fakerTH.date.past(),
							).format(),
							title: fakerTH.lorem.sentence(),
							content: fakerTH.lorem.paragraph(),
							topics: fakerTH.helpers
								.arrayElements(
									topics.split(" "),
									3,
								)
								.join(","),
							id,
							route_id: id,
						} as PickupRouteReportModel),
					{ count: 3 },
				);
			},
			{
				count: 10,
			},
		)
		.flat();

export const getPickupRouteReportGeneralAll =
	async () => {
		return routeGeneralReport;
	};

export const getPickupRouteReportGeneralAllWithRouteId =
	async (routeId: string) => {
		return routeGeneralReport.filter(
			(entry) => entry.route_id === routeId,
		);
	};

export const getPickupRouteReportGeneralWithId =
	async (reportId: string) => {
		for (const report of routeGeneralReport) {
			if (report.id === reportId) {
				return report;
			}
		}
		return null;
	};
