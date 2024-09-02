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
import { fakerTH } from "@faker-js/faker";
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

export const getOperationLogAll = async () => {
	const entries: OperationalLogModel[] =
		operationLogs;
	return entries;
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
	const entries: DriverModel[] = drivers;
	return entries;
};

export const getDriver = async (
	driverId: string,
): Promise<DriverModel | null> => {
	const entries = await getDriverAll();
	for (const entry of entries) {
		if (entry.id === driverId) {
			return entry;
		}
	}
	return null;
};
export const getDriverMany = async (
	driverIds: Set<string>,
) => {
	const entries = await getDriverAll();
	const collected: DriverModel[] = [];
	for (const entry of entries) {
		if (driverIds.has(entry.id)) {
			collected.push(entry);
		}
	}
	return collected;
};
//#endregion

//#region Driver Report General
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

export const getDriverReportGeneralAll =
	async () => {
		const entry: DriverReportModel[] =
			driverGeneralReports;
		return entry;
	};

export const getDriverReportGeneral = async (
	reportId: string,
) => {
	const entries: DriverReportModel[] =
		driverGeneralReports;
	for (const entry of entries) {
		if (entry.id === reportId) {
			return entry;
		}
	}
	return null;
};
//#endregion

//#region Driver Report Medical
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
export const getDriverReportMedicalAll =
	async () => {
		const entries: DriverReportModel[] =
			driverMedicalReports;
		return entries;
	};
export const getDriverReportMedical = async (
	reportId: string,
) => {
	const entries: DriverReportModel[] =
		driverMedicalReports;
	for (const entry of entries) {
		if (entry.id === reportId) {
			return entry;
		}
	}
	return null;
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

export const getVehicleAll = async () => {
	const entries: VehicleModel[] = vehicles;
	return entries;
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
	const entries = await getVehicleAll();
	const collected: VehicleModel[] = [];
	for (const entry of entries) {
		if (vehicleIds.has(entry.id)) {
			collected.push(entry);
		}
	}
	return collected;
};
//#endregion

//#region Vehicle Report General
const vehicleReportGeneral: VehicleReportGeneralModel[] =
	[
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
	];
export const getVehicleReportGeneralAll =
	async () => {
		const entries: VehicleReportGeneralModel[] =
			vehicleReportGeneral;
		return entries;
	};

export const getVehicleReportGeneral = async (
	reportId: string,
) => {
	const entries =
		await getVehicleReportGeneralAll();
	for (const entry of entries) {
		if (entry.id === reportId) {
			return entry;
		}
	}
	return null;
	// return {
	// 	id: reportId,
	// 	datetime: dayjs(fakerTH.date.past()).format(),
	// 	title: fakerTH.lorem.sentence(),
	// 	content: fakerTH.lorem.paragraph(),
	// 	topics: "",
	// 	vehicle_id: fakerTH.number
	// 		.int({
	// 			min: 0,
	// 			max: 10,
	// 		})
	// 		.toString(),
	// } as VehicleReportGeneralModel;
};
//#endregion

//#region Vehicle Report Inspection
export const getVehicleReportInspectionAll =
	async () => {
		const entries: VehicleReportInspectionModel[] =
			[];
		return entries;
	};
export const getVehicleReportInspection = async (
	reportId: string,
) => {
	const entries =
		await getVehicleReportInspectionAll();
	for (const entry of entries) {
		if (entry.id === reportId) {
			return entry;
		}
	}
	return null;

	// return {
	// 	frame: fakerTH.lorem.paragraph(),
	// 	front_camera: fakerTH.lorem.sentence(),
	// 	content: fakerTH.lorem.paragraph(),
	// 	datetime: dayjs(fakerTH.date.past()).format(),
	// 	fan_overhead: fakerTH.lorem.sentence(),
	// 	id: reportId,
	// 	inspection_round_number: "1",
	// 	brake_light: fakerTH.lorem.sentence(),
	// 	headlights: fakerTH.lorem.sentence(),
	// 	turn_signals: fakerTH.lorem.sentence(),
	// 	rearview_mirror: fakerTH.lorem.sentence(),
	// 	sideview_mirror: fakerTH.lorem.sentence(),
	// 	seatbelts: fakerTH.lorem.sentence(),
	// 	seats: fakerTH.lorem.sentence(),
	// 	topics: "",
	// 	vehicle_id: "0",
	// 	windows: fakerTH.lorem.sentence(),
	// } as VehicleReportInspectionModel;
};
//#endregion

//#region Topics
const topics = fakerTH.word.words(10);
export const getTopicAll = async (): Promise<
	string[]
> => {
	const entries: string[] = topics.split(" ");
	const entrySet = new Set(entries);
	return [...entrySet];
};
//#endregion

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
export const getPickupRouteAll = async () => {
	const entries: PickupRouteModel[] =
		pickupRoutes;
	return entries;
};
export const getPickupRoute = async (
	routeId: string,
) => {
	const entries = await getPickupRouteAll();
	for (const entry of entries) {
		if (entry.id === routeId) {
			return entry;
		}
	}
	return null;
};
export const getPickupRouteMany = async (
	routeIds: Set<string>,
) => {
	const entries = await getPickupRouteAll();
	const collected: PickupRouteModel[] = [];
	for (const entry of entries) {
		if (routeIds.has(entry.id)) {
			collected.push(entry);
		}
	}
	return collected;
};
//#endregion

//#region Pickup Route Report General
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
		const entries: PickupRouteReportModel[] =
			routeGeneralReport;
		return entries;
	};

export const getPickupRouteReportGeneral = async (
	reportId: string,
) => {
	const entries =
		await getPickupRouteReportGeneralAll();
	for (const entry of entries) {
		if (entry.id === reportId) {
			return entry;
		}
	}
	return null;
};
//#endregion
