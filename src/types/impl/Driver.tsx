import {
	getDriver,
	getOperationLogToday,
	getPickupRoute,
	getVehicle,
} from "$backend/database/get";
import { filterItems } from "$core/filter";
import { MultiSelectOption } from "$types/generics";
import {
	DriverEntry,
	DriverModel,
	DriverReportEntry,
	DriverReportModel,
} from "$types/models/Driver";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const DriverModelImpl = {
	toMultiSelectOption: (
		driver: DriverModel,
	): MultiSelectOption => {
		return {
			label: `${driver.name} ${driver.surname}`,
			value: driver.id.toString(),
		};
	},
	toEntry: async (driver: DriverModel) => {
		const logs = await getOperationLogToday();

		const routeIds = new Set<number>();
		const vehicleIds = new Set<number>();
		for (const log of logs) {
			if (log.driver_id !== driver.id) {
				continue;
			}
			routeIds.add(log.route_id);
			vehicleIds.add(log.vehicle_id);
		}

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

		const entry: DriverEntry = {
			id: driver.id,
			name: driver.name,
			surname: driver.surname,
			routes,
			vehicles,
		};
		return entry;
	},
};

export const DriverEntryImpl = {
	filter: (
		entries: DriverEntry[],
		search: string,
	) => {
		return filterItems(entries, search, [
			"name",
			"surname",
			"vehicles.*.licensePlate",
			"routes.*.name",
		]);
	},
};

export const DriverReportModelImpl = {
	toEntry: async (report: DriverReportModel) => {
		const driver = await getDriver(
			report.driver_id,
		);
		if (driver === null) {
			return null;
		}
		const entry: DriverReportEntry = {
			datetime: report.datetime,
			id: report.id,
			title: report.title,
			topics: report.topics.split(","),

			driverId: driver.id,
			driverName: driver.name,
			driverSurname: driver.surname,
		};
		return entry;
	},

	toInfoItems: (
		report: DriverReportModel,
		driver: DriverModel,
	) =>
		[
			{
				label: "เลขที่รายงาน",
				value: report.id,
			},
			{
				label: "คนขับรถ",
				value: (
					<Link to={"/drivers/info/" + driver.id}>
						{`${driver.name} ${driver.surname}`}
					</Link>
				),
			},
			{
				label: "ลงบันทึกเมื่อ",
				value: dayjs(report.datetime)
					.locale("th")
					.format(
						" HH:mm น. วันddddที่ DD MMMM YYYY",
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
		].map((item) => ({
			label: item.label,
			value: (
				<Typography>{item.value}</Typography>
			),
		})),
};
