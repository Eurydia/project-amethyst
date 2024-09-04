import { putAttendanceLog } from "$backend/database/put";
import { TableHeaderDefinition } from "$types/generics";
import { AttendanceLogEntry } from "$types/models/AttendanceLog";
import {
	Checkbox,
	FormControlLabel,
	Stack,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
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

	const expected = dayjs(
		item.expectedArrivalDatetime,
	);

	const handleCheckin = () => {
		if (isChecked) {
			return;
		}

		putAttendanceLog({
			id: item.id,
			route_id: item.routeId,
			vehicle_id: item.vehicleId,
			driver_id: item.driverId,
			expected_arrival_datetime:
				item.expectedArrivalDatetime,
			expected_departure_datetime:
				item.expectedDepartureDatetime,
			actual_departure_datetime:
				item.actualDepartureDatetime,
			actual_arrival_datetime: dayjs().format(),
		});
	};

	const isChecked =
		item.actualArrivalDatetime !== null;

	const isLate =
		isChecked &&
		dayjs(item.actualArrivalDatetime).isAfter(
			dayjs(item.expectedArrivalDatetime),
		);

	let label = "";
	let lateBy: ReactNode = null;
	if (isLate) {
		const actual = dayjs(
			item.actualArrivalDatetime,
		);
		label = actual.isSame(expected, "day")
			? actual.format("HH:mm น.")
			: actual.format("HH:mm น., DD/MM/YYYY ");

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

type CustomDepatureCheckboxProps = {
	item: AttendanceLogEntry;
};
const CustomDepatureCheckbox: FC<
	CustomDepatureCheckboxProps
> = (props) => {
	const { item } = props;

	const expected = dayjs(
		item.expectedDepartureDatetime,
	);

	const handleCheckin = () => {
		if (isChecked) {
			return;
		}

		putAttendanceLog({
			id: item.id,
			route_id: item.routeId,
			vehicle_id: item.vehicleId,
			driver_id: item.driverId,
			expected_arrival_datetime:
				item.expectedArrivalDatetime,
			actual_arrival_datetime:
				item.actualArrivalDatetime,

			expected_departure_datetime:
				item.expectedDepartureDatetime,
			actual_departure_datetime: dayjs().format(),
		});
	};

	const isChecked =
		item.actualDepartureDatetime !== null;

	const isLate =
		isChecked &&
		dayjs(item.actualDepartureDatetime).isAfter(
			dayjs(item.expectedArrivalDatetime),
		);

	let label = "";
	let lateBy: ReactNode = null;
	if (isLate) {
		const actual = dayjs(
			item.actualDepartureDatetime,
		);
		label = actual.isSame(expected, "day")
			? actual.format("HH:mm น.")
			: actual.format("HH:mm น., DD/MM/YYYY ");

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
	entries: AttendanceLogEntry[];
};
export const AttendanceLogTable: FC<
	AttendanceLogTableProps
> = (props) => {
	/**
	 * The attendance status should not have toggle behavior.
	 * Once the status is set, it is locked to prevent misclicks.
	 */
	// const updateAttendance = (key: string) => {
	// 	if (checked[key] !== undefined) {
	// 		return;
	// 	}

	// 	setCheck((prev) => {
	// 		const next = { ...prev };
	// 		next[key] = true;
	// 		return next;
	// 	});
	// };

	const { entries } = props;
	return (
		<BaseSortableTable
			headers={TABLE_HEADERS}
			defaultSortByColumn={0}
			defaultSortOrder="asc"
			entries={entries}
			slotProps={{
				addButton: {
					onClick: () => {},
					label: "",
					sx: {
						display: "none",
						visibility: "hidden",
					},
				},
				searchField: {
					onChange: () => {},
					placeholder: "ค้นหา",
					value: "",
				},
			}}
		>
			{[]}
		</BaseSortableTable>
	);
};
