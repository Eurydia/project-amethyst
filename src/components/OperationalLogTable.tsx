import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { OperationalLog } from "$types/models";
import { Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { MultiSelect } from "./MultiSelect";

const entriesToOptions = (
	entries: OperationalLog[],
) => {
	const uniqueDrivers: Record<string, string> =
		{};
	const uniqueVehicle: Record<string, string> =
		{};
	const uniqueRoute: Record<string, string> = {};

	for (const entry of entries) {
		uniqueDrivers[
			entry.driverId
		] = `${entry.driverName} ${entry.driverSurname}`;
		uniqueVehicle[entry.vehicleId] =
			entry.vehicleLicensePlate;
		uniqueRoute[entry.routeId] = entry.routeName;
	}

	const driverOptions = Object.entries(
		uniqueDrivers,
	).map(([value, label]) => ({ value, label }));
	const vehicleOptions = Object.entries(
		uniqueVehicle,
	).map(([value, label]) => ({ value, label }));
	const routeOptions = Object.entries(
		uniqueRoute,
	).map(([value, label]) => ({ value, label }));
	return {
		driverOptions,
		vehicleOptions,
		routeOptions,
	};
};

const filterEntries = (
	entries: OperationalLog[],
	afterDate: Dayjs | null,
	beforeDate: Dayjs | null,
	selectedRoutes: string[],
	selectedVehicles: string[],
	selectedDrivers: string[],
) => {
	let items = entries;
	if (afterDate !== null) {
		items = items.filter((entry) =>
			dayjs(entry.startDate).isAfter(afterDate),
		);
	}
	if (beforeDate !== null) {
		items = items.filter((entry) =>
			dayjs(entry.startDate).isBefore(beforeDate),
		);
	}
	const routeSet = new Set(selectedRoutes);
	const vehicleSet = new Set(selectedVehicles);
	const driverSet = new Set(selectedDrivers);

	items = items
		.filter((entry) =>
			routeSet.has(entry.routeId),
		)
		.filter((entry) =>
			vehicleSet.has(entry.vehicleId),
		)
		.filter((entry) =>
			driverSet.has(entry.driverId),
		);
	return items;
};

const searchEntries = (
	entries: OperationalLog[],
	search: string,
) => {
	const tokens = search
		.normalize()
		.split(" ")
		.map((token) => token.trim())
		.filter((token) => token.length > 0);

	return filterItems(entries, tokens, [
		"driver_name",
		"driver_surname",
		"vehicle_license_plate",
		"route_name",
	]);
};

const compareDates = (
	a: string | null,
	b: string | null,
) => {
	if (a === null || b === null) {
		return 0;
	} else if (a === null && b !== null) {
		return -1;
	} else if (a !== null && b === null) {
		return 1;
	}
	return dayjs(a).unix() - dayjs(b).unix();
};
const formatDate = (date: string | null) => {
	return dayjs(date).format("DD/MM/YYYY");
};

const HEADER_DEFINITION: TableHeaderDefinition<OperationalLog>[] =
	[
		{
			label: "เริ่ม",
			compare: (a, b) =>
				compareDates(a.startDate, b.startDate),
			render: (item) => (
				<Typography>
					{formatDate(item.startDate)}
				</Typography>
			),
		},
		{
			label: "สิ้นสุด",
			compare: (a, b) =>
				compareDates(a.endDate, b.endDate),
			render: (item) => (
				<Typography>
					{formatDate(item.endDate)}
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

type OperationalLogTableProps = {
	entries: OperationalLog[];
	onAdd: () => void;
};
export const OperationalLogTable: FC<
	OperationalLogTableProps
> = (props) => {
	const { entries, onAdd } = props;

	const {
		driverOptions,
		vehicleOptions,
		routeOptions,
	} = useMemo(
		() => entriesToOptions(entries),
		[entries],
	);

	const [search, setSearch] = useState("");
	const [afterDate, setAfterDate] =
		useState<Dayjs | null>(null);
	const [beforeDate, setBeforeDate] =
		useState<Dayjs | null>(null);
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
			filterEntries(
				entries,
				afterDate,
				beforeDate,
				selectedRoutes,
				selectedVehicles,
				selectedDrivers,
			),
		[
			entries,
			selectedDrivers,
			selectedRoutes,
			selectedRoutes,
			afterDate,
			beforeDate,
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
			label: "หลังจากวันที่",
			value: (
				<DateField
					fullWidth
					format="DD/MM/YYYY"
					formatDensity="spacious"
					value={afterDate}
					onChange={setAfterDate}
				/>
			),
		},
		{
			label: "ก่อนจากวันที่",
			value: (
				<DateField
					fullWidth
					format="DD/MM/YYYY"
					formatDensity="spacious"
					value={beforeDate}
					onChange={setBeforeDate}
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<MultiSelect
					options={routeOptions}
					selectedOptions={selectedRoutes}
					onChange={setSelectedRoutes}
				/>
			),
		},
		{
			label: "ทะเบียนรถ",
			value: (
				<MultiSelect
					options={vehicleOptions}
					selectedOptions={selectedVehicles}
					onChange={setSelectedVehicles}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<MultiSelect
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
					placeholder: "ค้นหา",
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
				addButton: {
					onClick: onAdd,
					variant: "contained",
					children: "ลงบันทึกประวัติการเดินรถ",
				},
			}}
		>
			{fitlerFormItems}
		</BaseSortableTable>
	);
};
