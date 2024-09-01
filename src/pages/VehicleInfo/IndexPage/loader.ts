import {
	getDriver,
	getOperationLogAllWithDriverId,
	getPickupRoute,
	getVehicleReportGeneralAllWithVehicleId,
	getVehicleReportInspectionAllWithVehicleId,
	getVehicle,
} from "$backend/database/get";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import {
	Vehicle,
	VehicleReportGeneralEntry,
	VehicleReportInspectionEntry,
} from "$types/models/Vehicle";
import dayjs from "dayjs";
import {
	json,
	LoaderFunction,
} from "react-router-dom";

export type IndexPageLoaderData = {
	vehicle: Vehicle;
	reportGeneralEntries: VehicleReportGeneralEntry[];
	reportInspectionEntries: VehicleReportInspectionEntry[];
	operationalLogEntries: OperationalLogEntry[];
};

export const indexPageLoader: LoaderFunction =
	async ({ params }) => {
		const { vehicleId } = params;
		if (vehicleId === undefined) {
			throw json(
				{ message: "ข้อมูลไม่ครบ" },
				{ status: 400 },
			);
		}

		const vehicleModel = await getVehicle(
			vehicleId,
		);

		if (vehicleModel === null) {
			throw json(
				{ message: "ไม่พบคนขับรถในระบบ" },
				{ status: 404 },
			);
		}
		const reportGeneralEntries = (
			await getVehicleReportGeneralAllWithVehicleId(
				vehicleModel.id,
			)
		).map(
			(rawEntry) =>
				({
					datetime: rawEntry.datetime,
					id: rawEntry.id,
					title: rawEntry.title,
					topics: rawEntry.topics.split(","),
					vehicleId: vehicleModel.id,
					vehicleLicensePlate:
						vehicleModel.license_plate,
				} as VehicleReportGeneralEntry),
		);
		const reportInspectionEntries = (
			await getVehicleReportInspectionAllWithVehicleId(
				vehicleModel.id,
			)
		)
			.toSorted(
				(a, b) =>
					dayjs(a.datetime).unix() -
					dayjs(b.datetime).unix(),
			)
			.map(
				(rawEntry, index) =>
					({
						datetime: rawEntry.datetime,
						id: rawEntry.id,
						inspectionRoundNumber: (
							index + 1
						).toString(),
						topics: rawEntry.topics.split(","),
						vehicleId: vehicleModel.id,
						vehicleLicensePlate:
							vehicleModel.license_plate,
					} as VehicleReportInspectionEntry),
			);

		const rawLogEntries =
			await getOperationLogAllWithDriverId(
				vehicleModel.id,
			);

		const logEntryRequests = rawLogEntries.map(
			async (rawEntry) => {
				const driver = await getDriver(
					rawEntry.driver_id,
				);
				if (driver === null) {
					return null;
				}
				const route = await getPickupRoute(
					rawEntry.route_id,
				);
				if (route === null) {
					return null;
				}
				return {
					id: rawEntry.id,
					startDate: rawEntry.start_date,
					endDate: rawEntry.end_date,

					vehicleId: vehicleModel.id,
					vehicleLicensePlate:
						vehicleModel.license_plate,

					driverId: driver.id,
					driverName: driver.name,
					driverSurname: driver.surname,

					routeId: route.id,
					routeName: route.name,
				} as OperationalLogEntry;
			},
		);

		const operationalLogEntries = (
			await Promise.all(logEntryRequests)
		).filter((entry) => entry !== null);

		const vehicle: Vehicle = {
			id: vehicleModel.id,
			licensePlate: vehicleModel.license_plate,
			registeredCity:
				vehicleModel.registered_city,
			vehicleClass: vehicleModel.vehicle_class,
			vendor: vehicleModel.vendor,
			images: [],
		};

		const loaderData: IndexPageLoaderData = {
			vehicle,
			operationalLogEntries,
			reportGeneralEntries,
			reportInspectionEntries,
		};

		return loaderData;
	};
