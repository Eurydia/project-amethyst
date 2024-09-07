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
import { Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";

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
	toInfoItems: (
		report: VehicleReportInspectionModel,
		vehicle: VehicleModel,
		inspectionRoundNumber: number,
	) =>
		[
			{
				label: "เลขที่ผลตรวจ",
				value: report.id,
			},
			{
				label: "ผลตรวจครั้งที่",
				value: inspectionRoundNumber,
			},
			{
				label: "ลงบันทึกเมื่อ",
				value: dayjs(report.datetime)
					.locale("th")
					.format("HH:mm น. DD MMMM YYYY"),
			},
			{
				label: "เลขทะเบียนรถ",
				value: (
					<Link
						to={"/vehicles/info/" + vehicle.id}
					>
						{vehicle.license_plate}
					</Link>
				),
			},
			{
				label: "กล้องหน้ารถ",
				value: report.front_camera,
			},
			{
				label: "เข็มขัดนิรภัย",
				value: report.seatbelts,
			},
			{
				label: "เบาะและที่นั่ง",
				value: report.seats,
			},
			{
				label: "พัดลม",
				value: report.overhead_fan,
			},
			{
				label: "หน้าต่าง",
				value: report.windows,
			},
			{
				label: "ไฟหน้า",
				value: report.headlights,
			},
			{
				label: "ไฟเบรค",
				value: report.brake_light,
			},
			{
				label: "ไฟเลี้ยว",
				value: report.turn_signals,
			},
			{
				label: "ยาง",
				value: report.tires,
			},
			{
				label: "ตัวรถ",
				value: report.frame,
			},
			{
				label: "กระจกมองหลัง",
				value: report.rearview_mirror,
			},
			{
				label: "กระจกมองข้าง",
				value: report.sideview_mirror,
			},
			{
				label: "รายละเอียดเพิ่มเติม",
				value: report.content,
			},
			{
				label: "หัวข้อที่เกี่ยวข้อง",
				value: report.topics.replaceAll(
					",",
					", ",
				),
			},
		].map((item) => ({
			label: item.label,
			value: (
				<Typography>{item.value}</Typography>
			),
		})),
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
	toInfoItems: (
		report: VehicleReportGeneralModel,
		vehicle: VehicleModel,
	) =>
		[
			{
				label: "เลขที่ร้องเรียน",
				value: report.id,
			},
			{
				label: "วันที่ลงบันทึก",
				value: dayjs(report.datetime)
					.locale("th")
					.format(
						"HH:mm น. วันddddที่ DD MMMM YYYY",
					),
			},
			{
				label: "ทะเบียนรถ",
				value: (
					<Link
						to={"/vehicles/info/" + vehicle.id}
					>
						{vehicle.license_plate}
					</Link>
				),
			},
			{
				label: "เรื่อง",
				value: report.title,
			},
			{
				label: "รายละเอียด",
				value: report.content,
			},
			{
				label: "หัวข้อที่เกี่ยวข้อง",
				value:
					report.topics.length > 0
						? report.topics.replaceAll(",", ", ")
						: "ไม่มีหัวข้อที่เกี่ยวข้อง",
			},
		].map(({ label, value }) => ({
			label,
			value: <Typography>{value}</Typography>,
		})),
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
