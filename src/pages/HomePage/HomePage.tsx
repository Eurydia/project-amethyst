import { AttendanceLogTable } from "$components/AttendanceLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
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

export const HomePage: FC = () => {
	const {} =
		useLoaderData() as HomePageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				หน้าแรก
			</Typography>
			<AttendanceLogTable entries={[]} />
		</Stack>
	);
};
