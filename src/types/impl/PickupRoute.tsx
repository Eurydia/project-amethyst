import {
	getDriver,
	getOperationLogToday,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import { filterItems } from "$core/filter";
import {
	PickupRouteEntry,
	PickupRouteModel,
	PickupRouteReportEntry,
	PickupRouteReportModel,
} from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";

export const PickupRouteEntryImpl = {
	filter: (
		entries: PickupRouteEntry[],
		selected: string[],
		search: string,
	) => {
		const selectedSet = new Set(selected);
		const filtered = entries.filter((entry) =>
			selectedSet.has(entry.id.toString()),
		);
		return filterItems(filtered, search, [
			"name",
			"vehicles.*.licensePlate",
			"drivers.*.name",
			"drivers.*.surname",
		]);
	},
};

export const PickupRouteModelImpl = {
	toMultiSelectOption: (
		route: PickupRouteModel,
	) => {
		return {
			value: route.id.toString(),
			label: route.name,
		};
	},

	toInfoItems: (route: PickupRouteModel) => {
		return [
			{
				label: "รหัสเลขที่สายรถ",
				value: route.id,
			},
			{
				label: "ชื่อสาย",
				value: route.name,
			},
			{
				label: "เวลานำเข้า",
				value: dayjs(
					route.arrival_time,
					"HH:mm",
				).format("HH:mm น."),
			},
			{
				label: "เวลานำออก",
				value: dayjs(
					route.departure_time,
					"HH:mm",
				).format("HH:mm น."),
			},
		].map(({ label, value }) => ({
			label,
			value: <Typography>{value}</Typography>,
		}));
	},

	toEntry: async (route: PickupRouteModel) => {
		const logs = await getOperationLogToday();

		const driverIds = new Set<number>();
		const vehicleIds = new Set<number>();
		for (const log of logs) {
			if (log.route_id !== route.id) {
				continue;
			}
			driverIds.add(log.driver_id);
			vehicleIds.add(log.vehicle_id);
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
		const vehicles = (
			await Promise.all(
				[...vehicleIds].map(getVehicle),
			)
		)
			.filter((vehicle) => vehicle !== null)
			.map(({ id, license_plate }) => ({
				id,
				licensePlate: license_plate,
			}));

		const entry: PickupRouteEntry = {
			id: route.id,
			name: route.name,
			drivers,
			vehicles,
		};
		return entry;
	},
};

export const PickupRouteReportModelImpl = {
	toEntry: async (
		report: PickupRouteReportModel,
	) => {
		const route = await getPickupRoute(
			report.route_id,
		);
		if (route === null) {
			return null;
		}
		const entry: PickupRouteReportEntry = {
			datetime: report.datetime,
			id: report.id,
			title: report.title,
			topics: report.topics.split(","),

			routeId: route.id,
			routeName: route.name,
		};
		return entry;
	},
	toInfoItems: (
		report: PickupRouteReportModel,
		route: PickupRouteModel,
	) =>
		[
			{
				label: "เลขที่เรื่องร้องเรียน",
				value: report.id,
			},
			{
				label: "บันทึกเมื่อ",
				value: dayjs(report.datetime)
					.locale("th")
					.format(
						"HH:mm น. วันddddที่ DD MMMM YYYY",
					),
			},
			{
				label: "สายรถ",
				value: (
					<Link
						to={"/pickup-routes/info/" + route.id}
					>
						{route.name}
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
				value: report.topics.replaceAll(
					",",
					", ",
				),
			},
		].map(({ label, value }) => ({
			label,
			value: <Typography> {value}</Typography>,
		})),
};

export const PickupRouteReportEntryImpl = {
	filter: (
		entries: PickupRouteReportEntry[],
		afterDate: Dayjs | null,
		beforeDate: Dayjs | null,
		selectedRoutes: string[],
		selectedTopics: string[],
		topicMustHaveAll: boolean,
		search: string,
	) => {
		const items = entries
			.filter(
				({ datetime }) =>
					afterDate === null ||
					dayjs(datetime).isAfter(afterDate),
			)
			.filter(
				({ datetime }) =>
					beforeDate === null ||
					dayjs(datetime).isBefore(beforeDate),
			);

		const routeSet = new Set(selectedRoutes);

		const filtered = items
			.filter((entry) =>
				routeSet.has(entry.routeId.toString()),
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
			"routeName",
		]);
	},
};
