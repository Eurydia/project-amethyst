import { postAttendanceLog } from "$backend/database/post";
import { AttendanceLogTable } from "$components/AttendanceLogTable";
import {
	AttendanceLogEntry,
	AttendanceLogModel,
} from "$types/models/AttendanceLog";
import { DriverModel } from "$types/models/Driver";
import { OperationalLogModel } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import {
	useLoaderData,
	useRevalidator,
} from "react-router-dom";
import { HomePageLoaderData } from "./loader";

const toEntry = (
	log: AttendanceLogModel,
	driver: DriverModel | undefined,
	vehicle: VehicleModel | undefined,
	route: PickupRouteModel | undefined,
) => {
	const entry: AttendanceLogEntry = {
		id: log.id,

		expectedArrivalDatetime:
			log.expected_arrival_datetime,
		expectedDepartureDatetime:
			log.expected_departure_datetime,
		actualArrivalDatetime:
			log.actual_arrival_datetime,
		actualDepartureDatetime:
			log.actual_departure_datetime,

		driverId: log.driver_id,
		driverName:
			driver === undefined ? "??" : driver.name,
		driverSurname:
			driver === undefined
				? "??"
				: driver.surname,

		vehicleId: log.vehicle_id,
		vehicleLicensePlate:
			vehicle === undefined
				? "??"
				: vehicle.license_plate,

		routeId: log.route_id,
		routeName:
			route === undefined ? "??" : route.name,
	};

	return entry;
};

const toEntries = (
	logs: AttendanceLogModel[],
	driverAll: DriverModel[],
	vehicleAll: VehicleModel[],
	routeAll: PickupRouteModel[],
) => {
	const entries = [];
	for (const log of logs) {
		const driver = driverAll.find(
			({ id }) => id === log.driver_id,
		);
		const vehicle = vehicleAll.find(
			({ id }) => id === log.vehicle_id,
		);
		const route = routeAll.find(
			({ id }) => id === log.route_id,
		);

		const entry = toEntry(
			log,
			driver,
			vehicle,
			route,
		);
		entries.push(entry);
	}
	return entries;
};

const prepareAttendanceLog = async (
	logs: OperationalLogModel[],
	routes: PickupRouteModel[],
) => {
	const postRequests = logs.map((log) => {
		const route = routes.find(
			({ id }) => id === log.route_id,
		);

		return postAttendanceLog({
			driver_id: log.driver_id,
			vehicle_id: log.vehicle_id,
			route_id: log.route_id,

			actual_arrival_datetime: null,
			actual_departure_datetime: null,

			expected_arrival_datetime:
				route === undefined
					? dayjs().startOf("day").format()
					: dayjs(
							route.arrival_time,
							"HH:mm",
					  ).format(),
			expected_departure_datetime:
				route === undefined
					? dayjs().endOf("day").format()
					: dayjs(
							route.departure_time,
							"HH:mm",
					  ).format(),
		});
	});

	await Promise.all(postRequests);
};

export const HomePage: FC = () => {
	const {
		attendanceLogs,
		operationalLogs,
		drivers,
		routes,
		vehicles,
	} = useLoaderData() as HomePageLoaderData;
	const { revalidate } = useRevalidator();
	useEffect(() => {
		if (
			attendanceLogs.length ===
			operationalLogs.length
		) {
			return;
		}
		prepareAttendanceLog(operationalLogs, routes);
		revalidate();
	}, []);

	const entries = toEntries(
		attendanceLogs,
		drivers,
		vehicles,
		routes,
	);

	return (
		<Stack spacing={4}>
			<Typography variant="h1">
				หน้าแรก
			</Typography>
			<AttendanceLogTable entries={entries} />
		</Stack>
	);
};
