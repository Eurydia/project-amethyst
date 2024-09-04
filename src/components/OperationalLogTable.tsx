import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { OperationalLogEntry } from "$types/models/OperatonalLog";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const compareDates = (
	a: string | null,
	b: string | null,
) => {
	if (a === null || b === null) {
		return 0;
	}
	return dayjs(a).unix() - dayjs(b).unix();
};

const HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry>[] =
	[
		{
			label: "เริ่ม",
			compare: (a, b) =>
				compareDates(a.startDate, b.startDate),
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
				compareDates(a.endDate, b.endDate),
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

const toOptions = (
	entries: OperationalLogEntry[],
) => {
	const drivers: Record<string, string> = {};
	const vehicles: Record<string, string> = {};
	const routes: Record<string, string> = {};

	for (const entry of entries) {
		drivers[
			entry.driverId
		] = `${entry.driverName} ${entry.driverSurname}`;
		vehicles[entry.vehicleId] =
			entry.vehicleLicensePlate;
		routes[entry.routeId] = entry.routeName;
	}

	const driverOptions = Object.entries(
		drivers,
	).map(([value, label]) => ({ value, label }));
	const vehicleOptions = Object.entries(
		vehicles,
	).map(([value, label]) => ({ value, label }));
	const routeOptions = Object.entries(routes).map(
		([value, label]) => ({ value, label }),
	);
	return {
		driverOptions,
		vehicleOptions,
		routeOptions,
	};
};

const filterOptions = (
	entries: OperationalLogEntry[],
	selectedDrivers: string[],
	selectedRoutes: string[],
	selectedVehicles: string[],
) => {
	const routeSet = new Set(selectedRoutes);
	const vehicleSet = new Set(selectedVehicles);
	const driverSet = new Set(selectedDrivers);

	return entries
		.filter((entry) =>
			routeSet.has(entry.routeId.toString()),
		)
		.filter((entry) =>
			vehicleSet.has(entry.vehicleId.toString()),
		)
		.filter((entry) =>
			driverSet.has(entry.driverId.toString()),
		);
};

const searchEntries = (
	entries: OperationalLogEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"driverName",
		"driverSurname",
		"vehicleLicensePlate",
		"routeName",
	]);
};

type OperationalLogTableProps = {
	entries: OperationalLogEntry[];
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const OperationalLogTable: FC<
	OperationalLogTableProps
> = (props) => {
	const { entries, slotProps } = props;

	const {
		driverOptions,
		vehicleOptions,
		routeOptions,
	} = useMemo(
		() => toOptions(entries),
		[entries],
	);

	const [search, setSearch] = useState("");
	const [selectedRoutes, setSelectedRoutes] =
		useState(
			routeOptions.map(({ value }) => value),
		);
	const [selectedVehicles, setSelectedVehicles] =
		useState(
			vehicleOptions.map(({ value }) => value),
		);
	const [selectedDrivers, setSelectedDrivers] =
		useState(
			driverOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(
		() =>
			filterOptions(
				entries,
				selectedDrivers,
				selectedRoutes,
				selectedVehicles,
			),
		[
			entries,
			selectedDrivers,
			selectedVehicles,
			selectedRoutes,
		],
	);

	const searchedEntries = useMemo(
		() => searchEntries(filteredEntries, search),
		[search, filteredEntries],
	);

	const fitlerFormItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "สายรถ",
			value: (
				<BaseInputMultiSelect
					options={routeOptions}
					selectedOptions={selectedRoutes}
					onChange={setSelectedRoutes}
				/>
			),
		},
		{
			label: "ทะเบียนรถ",
			value: (
				<BaseInputMultiSelect
					options={vehicleOptions}
					selectedOptions={selectedVehicles}
					onChange={setSelectedVehicles}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					options={driverOptions}
					selectedOptions={selectedDrivers}
					onChange={setSelectedDrivers}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			entries={searchedEntries}
			headers={HEADER_DEFINITION}
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
					onClick: slotProps.addButton.onClick,
					label: "ลงบันทึก",
				},
			}}
		>
			{fitlerFormItems}
		</BaseSortableTable>
	);
};
