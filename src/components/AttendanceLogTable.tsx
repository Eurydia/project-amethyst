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
import {
	Link,
	useRevalidator,
} from "react-router-dom";
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
			actualDepartureDatetime,
			actualArrivalDatetime: dayjs().format(),
		});
		revalidate();
	};

	const isChecked = actualArrivalDatetime !== "";

	const isLate =
		isChecked &&
		dayjs(expectedArrivalDatetime).isAfter(
			dayjs(actualArrivalDatetime),
		);

	let label = "";
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
	const { revalidate } = useRevalidator();
	const { item } = props;
	const {
		id,
		expectedArrivalDatetime,
		expectedDepartureDatetime,
		actualDepartureDatetime,
		actualArrivalDatetime,
	} = item;
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
		actualDepartureDatetime !== "";

	const isLate =
		isChecked &&
		dayjs(expectedArrivalDatetime).isAfter(
			dayjs(actualDepartureDatetime),
		);

	let label = "";
	let lateBy: ReactNode = null;
	if (isChecked) {
		const actual = dayjs(actualDepartureDatetime);
		label = actual.isSame(expected, "day")
			? actual.format("HH:mm น.")
			: actual.format("HH:mm น., DD/MM/YYYY ");
		if (isLate) {
			const lateByLabel = expected
				.locale("th")
				.from(actual);
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
