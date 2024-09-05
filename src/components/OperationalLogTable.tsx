import {
	getDriver,
	getDriverAll,
	getOperationLogAll,
	getPickupRoute,
	getPickupRouteAll,
	getVehicle,
	getVehicleAll,
} from "$backend/database/get";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/Driver";
import {
	OperationalLogEntry,
	OperationalLogModel,
} from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<OperationalLogEntry>[] =
	[
		{
			label: "เริ่มมีผล",
			compare: (a, b) =>
				dayjs(a.startDate).unix() -
				dayjs(b.startDate).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.startDate).format(
						"DD/MM/YYYY",
					)}
				</Typography>
			),
		},
		{
			label: "สิ้นสุด",
			compare: (a, b) =>
				dayjs(a.endDate).unix() -
				dayjs(b.endDate).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.endDate).format(
						"DD/MM/YYYY",
					)}
				</Typography>
			),
		},
		{
			label: "คนขับรถ",
			compare: (a, b) =>
				a.driverName.localeCompare(b.driverName),
			render: (item) => (
				<Typography
					component={Link}
					to={"/drivers/info/" + item.driverId}
				>
					{item.driverName} {item.driverSurname}
				</Typography>
			),
		},
		{
			label: "ทะเบียนรถ",
			compare: null,
			render: (item) => (
				<Typography
					component={Link}
					to={"/vehicles/info/" + item.vehicleId}
				>
					{item.vehicleLicensePlate}
				</Typography>
			),
		},
		{
			label: "สายรถ",
			compare: (a, b) =>
				a.routeName.localeCompare(b.routeName),
			render: (item) => (
				<Typography
					component={Link}
					to={"/routes/info/" + item.routeId}
				>
					{item.routeName}
				</Typography>
			),
		},
	];

const getDriverOptions = async (
	driver: DriverModel | undefined,
) => {
	const drivers =
		driver !== undefined
			? [driver]
			: await getDriverAll();
	return drivers.map(({ name, surname, id }) => ({
		label: `${name} ${surname}`,
		value: id.toString(),
	}));
};

const getVehicleOptions = async (
	vehicle: VehicleModel | undefined,
) => {
	const vehicles =
		vehicle !== undefined
			? [vehicle]
			: await getVehicleAll();
	return vehicles.map(
		({ license_plate, id }) => ({
			label: license_plate,
			value: id.toString(),
		}),
	);
};

const getRouteOptions = async (
	route: PickupRouteModel | undefined,
) => {
	const routes =
		route !== undefined
			? [route]
			: await getPickupRouteAll();

	return routes.map(({ id, name }) => ({
		value: id.toString(),
		label: name,
	}));
};

const filterEntries = (
	entries: OperationalLogEntry[],
	drivers: string[],
	routes: string[],
	vehicles: string[],
	search: string,
) => {
	const routeSet = new Set(routes);
	const vehicleSet = new Set(vehicles);
	const driverSet = new Set(drivers);

	const filtered = entries
		.filter((entry) =>
			routeSet.has(entry.routeId.toString()),
		)
		.filter((entry) =>
			vehicleSet.has(entry.vehicleId.toString()),
		)
		.filter((entry) =>
			driverSet.has(entry.driverId.toString()),
		);

	return filterItems(filtered, search, [
		"driverName",
		"driverSurname",
		"vehicleLicensePlate",
		"routeName",
	]);
};

const logToEntry = async (
	log: OperationalLogModel,
) => {
	const vehicle = await getVehicle(
		log.vehicle_id,
	);
	const driver = await getDriver(log.driver_id);
	const route = await getPickupRoute(
		log.route_id,
	);

	if (
		vehicle === null ||
		driver === null ||
		route === null
	) {
		return null;
	}

	const entry: OperationalLogEntry = {
		id: log.id,
		startDate: log.start_date,
		endDate: log.end_date,

		vehicleId: vehicle.id,
		vehicleLicensePlate: vehicle.license_plate,

		driverId: driver.id,
		driverName: driver.name,
		driverSurname: driver.surname,

		routeId: route.id,
		routeName: route.name,
	};
	return entry;
};

type OperationalLogTableProps = {
	driver?: DriverModel;
	vehicle?: VehicleModel;
	route?: PickupRouteModel;
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const OperationalLogTable: FC<
	OperationalLogTableProps
> = (props) => {
	const { slotProps, driver, route, vehicle } =
		props;

	const [entries, setEntries] = useState<
		OperationalLogEntry[]
	>([]);

	const [driverOptions, setDriverOptions] =
		useState<{ label: string; value: string }[]>(
			[],
		);
	const [vehicleOptions, setVehicleOptions] =
		useState<{ label: string; value: string }[]>(
			[],
		);
	const [routeOptions, setRouteOptions] =
		useState<{ label: string; value: string }[]>(
			[],
		);

	const [search, setSearch] = useState("");
	const [routes, setRoutes] = useState<string[]>(
		[],
	);
	const [vehicles, setVehicles] = useState<
		string[]
	>([]);
	const [drivers, setDrivers] = useState<
		string[]
	>([]);

	useEffect(() => {
		(async () => {
			const _driverOptions =
				await getDriverOptions(driver);
			const _vehicleOptions =
				await getVehicleOptions(vehicle);
			const _routeOptions = await getRouteOptions(
				route,
			);

			setDriverOptions(_driverOptions);
			setVehicleOptions(_vehicleOptions);
			setRouteOptions(_routeOptions);

			setDrivers(
				_driverOptions.map(({ value }) => value),
			);
			setVehicles(
				_vehicleOptions.map(({ value }) => value),
			);
			setRoutes(
				_routeOptions.map(({ value }) => value),
			);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const logs = await getOperationLogAll();

			const reqs = logs
				.filter(
					({ driver_id }) =>
						driver === undefined ||
						driver_id === driver.id,
				)
				.filter(
					({ vehicle_id }) =>
						vehicle === undefined ||
						vehicle_id === vehicle.id,
				)
				.filter(
					({ route_id }) =>
						route === undefined ||
						route_id === route.id,
				)
				.map(logToEntry);
			const items = await Promise.all(reqs);
			const entries = items.filter(
				(item) => item !== null,
			);
			setEntries(entries);
		})();
	}, []);

	const filteredEntries = filterEntries(
		entries,
		drivers,
		routes,
		vehicles,
		search,
	);

	const fitlerFormItems = [
		{
			label: "สายรถ",
			value: (
				<BaseInputMultiSelect
					isDisabled={route !== undefined}
					options={routeOptions}
					selectedOptions={routes}
					onChange={setRoutes}
				/>
			),
		},
		{
			label: "ทะเบียนรถ",
			value: (
				<BaseInputMultiSelect
					isDisabled={vehicle !== undefined}
					options={vehicleOptions}
					selectedOptions={vehicles}
					onChange={setVehicles}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					isDisabled={driver !== undefined}
					options={driverOptions}
					selectedOptions={drivers}
					onChange={setDrivers}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			entries={filteredEntries}
			headers={HEADER_DEFINITIONS}
			defaultSortByColumn={0}
			defaultSortOrder="desc"
			slotProps={{
				searchField: {
					placeholder:
						"ค้นหาด้วยชื่อนามสกุล, ทะเบียนรถ, สายรถ",
					value: search,
					onChange: setSearch,
				},
				addButton: {
					label: "ลงบันทึก",
					onClick: slotProps.addButton.onClick,
					disabled:
						driverOptions.length === 0 ||
						vehicleOptions.length === 0 ||
						routeOptions.length === 0,
				},
			}}
		>
			{fitlerFormItems}
		</BaseSortableTable>
	);
};
