import { putAttendanceLog } from "$backend/database/put";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { AttendanceLogEntry } from "$types/models/attendance-log";
import { SearchRounded } from "@mui/icons-material";
import {
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AttendanceLogTableCheckBox } from "./AttendanceLogTableCheckBox";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<AttendanceLogEntry>[] =
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
			label: "เวลารับข้า",
			compare: null,
			render: (item) => (
				<AttendanceLogTableCheckBox
					label="รับเข้า"
					actual={item.actualArrivalDatetime}
					expected={item.expectedArrivalDatetime}
					onClick={async () =>
						putAttendanceLog({
							id: item.id,
							actualArrivalDatetime:
								dayjs().format(),
							actualDepartureDatetime:
								item.actualDepartureDatetime,
						})
					}
				/>
			),
		},
		{
			label: "เวลารับออก",
			compare: null,
			render: (item) => (
				<AttendanceLogTableCheckBox
					label="รับออก"
					actual={item.actualDepartureDatetime}
					expected={
						item.expectedDepartureDatetime
					}
					onClick={async () =>
						putAttendanceLog({
							id: item.id,
							actualArrivalDatetime:
								item.actualArrivalDatetime,
							actualDepartureDatetime:
								dayjs().format(),
						})
					}
				/>
			),
		},
	];

type AttendanceLogTableProps = {
	entries: AttendanceLogEntry[];
};
export const AttendanceLogTable: FC<
	AttendanceLogTableProps
> = (props) => {
	const { entries } = props;
	const [search, setSearch] = useState("");

	const filteredEntries = filterItems(
		entries,
		search,
		[
			"routeName",
			"vehicleLicensePlate",
			"driverName",
			"driverSurname",
		],
	);

	return (
		<Stack spacing={1}>
			<TextField
				fullWidth
				placeholder="ค้นหาด้วยชื่อสกุลคนขับรถ, สายรถ, หรือเลขทะเบียน"
				value={search}
				onChange={(e) =>
					setSearch(e.target.value)
				}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchRounded />
							</InputAdornment>
						),
					},
				}}
			/>
			<BaseSortableTable
				headers={HEADER_DEFINITIONS}
				defaultSortByColumn={0}
				defaultSortOrder="asc"
				entries={filteredEntries}
				slotProps={{
					body: {
						emptyText: "ไม่พบรายการ",
					},
				}}
			/>
		</Stack>
	);
};
