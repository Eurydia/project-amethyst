import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReportEntry } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";

const HEADER_DEFINITIONS: TableHeaderDefinition<DriverReportEntry>[] =
	[
		{
			label: "เวลาและวันที่",
			compare: (a, b) =>
				dayjs(a.datetime).unix() -
				dayjs(b.datetime).unix(),
			render: (item) => (
				<Typography>
					{dayjs(item.datetime)
						.locale("th")
						.format("HH:mm น. DD MMMM YYYY")}
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
			label: "เรื่อง",
			compare: (a, b) =>
				a.title.localeCompare(b.title),
			render: (item) => (
				<Typography
					component={Link}
					to={
						"/drivers/report/general/info/" +
						item.id
					}
				>
					{item.title}
				</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) =>
				item.topics.length === 0 ? (
					<Typography fontWeight="bold">
						ไม่มี
					</Typography>
				) : (
					<Typography>
						{item.topics.join(", ")}
					</Typography>
				),
		},
	];

type DriverReportGeneralTableProps = {
	entries: DriverReportEntry[];
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
	};
};
export const DriverReportGeneralTable: FC<
	DriverReportGeneralTableProps
> = (props) => {
	const { entries, slotProps } = props;

	const [search, setSearch] = useState("");

	const filteredEntries = filterItems(
		entries,
		search,
		[
			"title",
			"topics",
			"driverName",
			"driverSurname",
		],
	);

	return (
		<Stack spacing={1}>
			<BaseSortableTableToolbar
				slotProps={{
					addButton: {
						label: "เพิ่มเรื่องร้องเรียน",
						disabled:
							slotProps.addButton.disabled,
						onClick: slotProps.addButton.onClick,
					},
					searchField: {
						placeholder: `ค้นหาด้วยชื่อสกุลคนขับรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง`,
						value: search,
						onChange: setSearch,
					},
				}}
			/>
			<BaseSortableTable
				defaultSortByColumn={0}
				defaultSortOrder="desc"
				entries={filteredEntries}
				headers={HEADER_DEFINITIONS}
			/>
		</Stack>
	);
};
