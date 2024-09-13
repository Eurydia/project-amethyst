import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReportEntry } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";

const DATETIME_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
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
	};
const DRIVER_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
	{
		label: "คนขับรถ",
		compare: (a, b) =>
			a.driverName.localeCompare(b.driverName),
		render: (item) => (
			<BaseTypographyLink
				toPage={"/drivers/info/" + item.driverId}
			>
				{item.driverName} {item.driverSurname}
			</BaseTypographyLink>
		),
	};

const TITLE_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
	{
		label: "ชื่อเรื่อง",
		compare: (a, b) =>
			a.title.localeCompare(b.title),
		render: (item) => (
			<BaseTypographyLink
				toPage={
					"/drivers/report/medical/info/" +
					item.id
				}
			>
				{item.title}
			</BaseTypographyLink>
		),
	};

const TOPICS_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
	{
		label: "หัวข้อที่เกี่ยวข้อง",
		compare: null,
		render: (item) =>
			item.topics.length === 0 ? (
				<Typography fontStyle="italic">
					ไม่มี
				</Typography>
			) : (
				<Typography>
					{item.topics.join(", ")}
				</Typography>
			),
	};

type DriverReportMedicalTableProps = {
	entries: DriverReportEntry[];
	hideDriverColumn?: boolean;
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
	};
};
export const DriverReportMedicalTable: FC<
	DriverReportMedicalTableProps
> = (props) => {
	const { hideDriverColumn, entries, slotProps } =
		props;

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

	let headers = [
		DATETIME_COLUMN_DEFINITION,
		DRIVER_COLUMN_DEFINITION,
		TITLE_COLUMN_DEFINITION,
		TOPICS_COLUMN_DEFINITION,
	];
	if (hideDriverColumn) {
		headers = [
			DATETIME_COLUMN_DEFINITION,
			TITLE_COLUMN_DEFINITION,
			TOPICS_COLUMN_DEFINITION,
		];
	}

	return (
		<Stack spacing={1}>
			<BaseSortableTableToolbar
				slotProps={{
					addButton: {
						label: "เพิ่มผลตรวจ",
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
				slotProps={{
					body: {
						emptyText: `ไม่พบผลการตรวจสารเสพติด`,
					},
				}}
				defaultSortByColumn={0}
				defaultSortOrder="desc"
				entries={filteredEntries}
				headers={headers}
			/>
		</Stack>
	);
};
