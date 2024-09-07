import { putAttendanceLog } from "$backend/database/put";
import { filterItems } from "$core/filter";
import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { AttendanceLogEntry } from "$types/models/AttendanceLog";
import {
	Checkbox,
	FormControlLabel,
	Stack,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useRevalidator,
} from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const TABLE_HEADERS: TableHeaderDefinition<AttendanceLogEntry>[] =
	[
		{
			label: "สายรถ",
			compare: (a, b) =>
				a.routeName.localeCompare(b.routeName),
			render: (item) => (
				<Typography>
					<Link
						to={
							"/pickup-routes/info/" +
							item.routeId
						}
					>
						{item.routeName}
					</Link>
				</Typography>
			),
		},
		{
			label: "เลขทะเบียน",
			compare: (a, b) =>
				a.vehicleLicensePlate.localeCompare(
					b.vehicleLicensePlate,
				),
			render: (item) => (
				<Typography>
					<Link
						to={
							"/vehicles/info/" + item.vehicleId
						}
					>
						{item.vehicleLicensePlate}
					</Link>
				</Typography>
			),
		},
		{
			label: "คนขับรถ",
			compare: (a, b) =>
				a.driverName.localeCompare(b.driverName),
			render: (item) => (
				<Typography>
					<Link
						to={"/drivers/info/" + item.driverId}
					>
						{`${item.driverName} ${item.driverSurname}`}
					</Link>
				</Typography>
			),
		},
		{
			label: "เวลานำเข้า",
			compare: null,
			render: (item) => (
				<CustomArrivalCheckbox item={item} />
			),
		},
		{
			label: "เวลานำออก",
			compare: null,
			render: (item) => (
				<CustomDepatureCheckbox item={item} />
			),
		},
	];

type CustomArrivalCheckboxProps = {
	item: AttendanceLogEntry;
};
const CustomArrivalCheckbox: FC<
	CustomArrivalCheckboxProps
> = (props) => {
	const { item } = props;

	const {
		id,
		actualDepartureDatetime,
		actualArrivalDatetime,
		expectedArrivalDatetime,
	} = item;
	const { revalidate } = useRevalidator();
	const expected = dayjs(expectedArrivalDatetime);

	const handleCheckin = async () => {
		if (isChecked) {
			return;
		}

		await putAttendanceLog({
			id,
			actualArrivalDatetime: dayjs().format(),
			actualDepartureDatetime,
		});
		revalidate();
	};

	const isChecked =
		actualArrivalDatetime !== null;

	const isLate =
		isChecked &&
		dayjs(actualArrivalDatetime).isAfter(
			dayjs(expectedArrivalDatetime),
		);

	let label = "รับเข้า";
	let lateBy: ReactNode = null;
	if (isChecked) {
		const actual = dayjs(actualArrivalDatetime);

		label = actual.isSame(expected, "day")
			? actual.format("HH:mm น.")
			: actual.format("HH:mm น., DD/MM/YYYY ");

		if (isLate) {
			const lateByLabel = expected
				.locale("th")
				.from(actual, true);
			lateBy = (
				<Typography
					color="error"
					fontWeight="bold"
				>
					{`สายไป ${lateByLabel}`}
				</Typography>
			);
		}
	}

	return (
		<Stack>
			<FormControlLabel
				disableTypography
				checked={isChecked}
				disabled={isChecked}
				onClick={handleCheckin}
				label={<Typography>{label}</Typography>}
				control={<Checkbox />}
			/>
			{lateBy}
		</Stack>
	);
};

type CustomDepatureCheckboxProps = {
	item: AttendanceLogEntry;
};
const CustomDepatureCheckbox: FC<
	CustomDepatureCheckboxProps
> = (props) => {
	const { item } = props;
	const {
		id,
		expectedDepartureDatetime,
		actualDepartureDatetime,
		actualArrivalDatetime,
	} = item;
	const { revalidate } = useRevalidator();
	const expected = dayjs(
		expectedDepartureDatetime,
	);

	const handleCheckin = async () => {
		if (isChecked) {
			return;
		}

		await putAttendanceLog({
			id,
			actualDepartureDatetime: dayjs().format(),
			actualArrivalDatetime,
		});
		revalidate();
	};

	const isChecked =
		actualDepartureDatetime !== null;

	const isLate =
		isChecked &&
		dayjs(actualDepartureDatetime).isAfter(
			dayjs(actualDepartureDatetime),
		);

	let label = "รับออก";
	let lateBy: ReactNode = null;
	if (isChecked) {
		const actual = dayjs(actualDepartureDatetime);
		label = actual.isSame(expected, "day")
			? actual.format("HH:mm น.")
			: actual.format("HH:mm น., DD/MM/YYYY ");
		if (isLate) {
			const lateByLabel = expected
				.locale("th")
				.from(actual, true);
			lateBy = (
				<Typography
					color="error"
					fontWeight="bold"
				>
					{`สาย ${lateByLabel}`}
				</Typography>
			);
		}
	}

	return (
		<Stack>
			<FormControlLabel
				disableTypography
				label={<Typography>{label}</Typography>}
				control={
					<Checkbox
						onChange={handleCheckin}
						disabled={isChecked}
						checked={isChecked}
					/>
				}
			/>
			{lateBy}
		</Stack>
	);
};

type AttendanceLogTableProps = {
	slotProps: {
		driverMultiSelect: {
			options: MultiSelectOption[];
		};
		vehicleMultiSelect: {
			options: MultiSelectOption[];
		};
		routeMultiSelect: {
			options: MultiSelectOption[];
		};
	};
	entries: AttendanceLogEntry[];
};
export const AttendanceLogTable: FC<
	AttendanceLogTableProps
> = (props) => {
	const { entries, slotProps } = props;
	const [search, setSearch] = useState("");

	const [vehicles, setVehicles] = useState(
		slotProps.vehicleMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const [drivers, setDrivers] = useState(
		slotProps.driverMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const [routes, setRoutes] = useState(
		slotProps.routeMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const driverSet = new Set(drivers);
	const routeSet = new Set(routes);
	const vehicleSet = new Set(vehicles);

	const filteredEntries = filterItems(
		entries.filter(
			({ driverId, routeId, vehicleId }) =>
				driverSet.has(driverId.toString()) &&
				routeSet.has(routeId.toString()) &&
				vehicleSet.has(vehicleId.toString()),
		),
		search,
		[
			"routeName",
			"vehicleLicensePlate",
			"driverName",
			"driverSurname",
		],
	);

	const filterFormItems = [
		{
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					options={
						slotProps.driverMultiSelect.options
					}
					selectedOptions={drivers}
					onChange={setDrivers}
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<BaseInputMultiSelect
					options={
						slotProps.routeMultiSelect.options
					}
					selectedOptions={routes}
					onChange={setRoutes}
				/>
			),
		},
		{
			label: "เลขทะเบียน",
			value: (
				<BaseInputMultiSelect
					options={
						slotProps.vehicleMultiSelect.options
					}
					selectedOptions={vehicles}
					onChange={setVehicles}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			headers={TABLE_HEADERS}
			defaultSortByColumn={0}
			defaultSortOrder="asc"
			entries={filteredEntries}
			slotProps={{
				addButton: {
					onClick: () => {},
					hidden: true,
					label: "",
				},
				searchField: {
					onChange: setSearch,
					placeholder:
						"ค้นหาด้วยคนขับรถ, เลขทะเบียนรถ, หรือสายรถ",
					value: search,
				},
			}}
		>
			{filterFormItems}
		</BaseSortableTable>
	);
};
