import {
	getDriver,
	getOperationLogToday,
	getPickupRoute,
	getVehicle,
	getVehicleReportInspectionAll,
} from "$backend/database/get";
import { filterItems } from "$core/filter";
import { MultiSelectOption } from "$types/generics";
import {
	VehicleEntry,
	VehicleModel,
	VehicleReportGeneralEntry,
	VehicleReportGeneralModel,
	VehicleReportInspectionEntry,
	VehicleReportInspectionModel,
} from "$types/models/Vehicle";
import dayjs, { Dayjs } from "dayjs";

export const VehicleReportInspectionModelImpl = {
	toEntry: async (
		report: VehicleReportInspectionModel,
	) => {
		const vehicle = await getVehicle(
			report.vehicle_id,
		);
		if (vehicle === null) {
			return null;
		}

		const reports = (
			await getVehicleReportInspectionAll()
		)
			.filter(
				({ vehicle_id }) =>
					vehicle_id === vehicle.id,
			)
			.toReversed();
		let count = 0;
		for (const report of reports) {
			if (report.vehicle_id === vehicle.id) {
				count++;
			}
			if (report.id === report.id) {
				break;
			}
		}
		const entry: VehicleReportInspectionEntry = {
			inspectionRoundNumber: count,

			datetime: report.datetime,
			id: report.id,
			topics: report.topics.split(","),

			vehicleId: vehicle.id,
			vehicleLicensePlate: vehicle.license_plate,
		};
		return entry;
	},
};

export const VehicleReportGeneralModelImpl = {
	toEntry: async (
		report: VehicleReportGeneralModel,
	) => {
		const vehicle = await getVehicle(
			report.vehicle_id,
		);
		if (vehicle === null) {
			return null;
		}

		const entry: VehicleReportGeneralEntry = {
			datetime: report.datetime,
			id: report.id,
			title: report.title,
			topics: report.topics
				.normalize()
				.split(",")
				.map((topic) => topic.trim())
				.filter((topic) => topic.length > 0),

			vehicleId: vehicle.id,
			vehicleLicensePlate: vehicle.license_plate,
		};
		return entry;
	},
};

export const VehicleModelImpl = {
	toMultiSelectOption: (
		vehicle: VehicleModel,
	): MultiSelectOption => {
		return {
			label: vehicle.license_plate,
			value: vehicle.id.toString(),
		};
	},
	toEntry: async (vehicle: VehicleModel) => {
		const logs = await getOperationLogToday();

		const driverIds = new Set<number>();
		const routeIds = new Set<number>();
		for (const log of logs) {
			if (log.vehicle_id !== vehicle.id) {
				continue;
			}
			driverIds.add(log.driver_id);
			routeIds.add(log.route_id);
		}

		const drivers = (
			await Promise.all(
				[...driverIds].map(getDriver),
			)
		)
			.filter((driver) => driver !== null)
			.map(({ id, name, surname }) => ({
				id,
				name,
				surname,
			}));
		const routes = (
			await Promise.all(
				[...routeIds].map(getPickupRoute),
			)
		)
			.filter((route) => route !== null)
			.map(({ id, name }) => ({
				id,
				name,
			}));

		const entry: VehicleEntry = {
			id: vehicle.id,
			licensePlate: vehicle.license_plate,
			routes,
			drivers,
		};
		return entry;
	},
};

export const VehicleEntryImpl = {
	filter: (
		entries: VehicleEntry[],
		selectedVehicles: string[],
		search: string,
	) => {
		const vehicleSet = new Set(selectedVehicles);
		const filtered = entries.filter((entry) =>
			vehicleSet.has(entry.id.toString()),
		);
		return filterItems(filtered, search, [
			"licensePlate",
			"routes.*.name",
			"drivers.*.name",
			"drivers.*.surname",
		]);
	},
};

export const VehicleReportInspectionEntryImpl = {
	filter: (
		entries: VehicleReportInspectionEntry[],
		afterDate: Dayjs | null,
		beforeDate: Dayjs | null,
		selectedVehicles: string[],
		selectedTopics: string[],
		topicMustHaveAll: boolean,
		search: string,
	) => {
		let items = entries;
		if (afterDate !== null) {
			items = items.filter((entry) =>
				dayjs(entry.datetime).isAfter(afterDate),
			);
		}
		if (beforeDate !== null) {
			items = items.filter((entry) =>
				dayjs(entry.datetime).isBefore(
					beforeDate,
				),
			);
		}
		const vehicleSet = new Set(selectedVehicles);
		const filtered = items
			.filter((entry) =>
				vehicleSet.has(
					entry.vehicleId.toString(),
				),
			)
			.filter((entry) => {
				const topicSet = new Set(entry.topics);
				return topicMustHaveAll
					? selectedTopics.every((topic) =>
							topicSet.has(topic),
					  )
					: selectedTopics.some((topic) =>
							topicSet.has(topic),
					  );
			});
		return filterItems(filtered, search, [
			"title",
			"topics",
			"vehicleLicensePlate",
			"inspectionRoundNumber",
		]);
	},
};

export const VehicleReportGeneralEntryImpl = {
	fitler: (
		entries: VehicleReportGeneralEntry[],
		afterDate: Dayjs | null,
		beforeDate: Dayjs | null,
		selectedVehicles: string[],
		selectedTopics: string[],
		topicMustHaveAll: boolean,
		search: string,
	) => {
		let items = entries
			.filter(
				(entry) =>
					afterDate === null ||
					dayjs(entry.datetime).isAfter(
						afterDate,
					),
			)
			.filter(
				(entry) =>
					beforeDate === null ||
					dayjs(entry.datetime).isBefore(
						beforeDate,
					),
			);

		const vehicleSet = new Set(selectedVehicles);

		const filtered = items
			.filter((entry) =>
				vehicleSet.has(
					entry.vehicleId.toString(),
				),
			)
			.filter((entry) => {
				const topicSet = new Set(entry.topics);
				return topicMustHaveAll
					? selectedTopics.every((topic) =>
							topicSet.has(topic),
					  )
					: selectedTopics.some((topic) =>
							topicSet.has(topic),
					  );
			});
		return filterItems(filtered, search, [
			"title",
			"topics",
			"vehicleLicensePlate",
		]);
	},
};
