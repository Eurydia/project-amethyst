import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleReportGeneralEntry } from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<VehicleReportGeneralEntry>[] =
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
			label: "เลขทะเบียน",
			compare: null,
			render: ({
				vehicleId,
				vehicleLicensePlate,
			}) => (
				<Typography
					component={Link}
					to={"/vehicles/info/" + vehicleId}
				>
					{vehicleLicensePlate}
				</Typography>
			),
		},
		{
			label: "เรื่อง",
			compare: null,
			render: ({ id, title }) => (
				<Typography
					component={Link}
					to={
						"/vehicles/report/general/info/" + id
					}
				>
					{title}
				</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: ({ topics }) =>
				topics.length === 0 ? (
					<Typography fontWeight="bold">
						ไม่มี
					</Typography>
				) : (
					<Typography>
						{topics.join(", ")}
					</Typography>
				),
		},
	];

type VehicleReportGeneralTableProps = {
	entries: VehicleReportGeneralEntry[];
	slotProps: {
		addButton: {
			onClick: () => void;
			disabled?: boolean;
		};
	};
};
export const VehicleReportGeneralTable: FC<
	VehicleReportGeneralTableProps
> = (props) => {
	const { entries, slotProps } = props;

	const [search, setSearch] = useState("");

	const filteredEntries = filterItems(
		entries,
		search,
		["title", "topics", "vehicleLicensePlate"],
	);

	return (
		<BaseSortableTable
			defaultSortByColumn={0}
			defaultSortOrder="desc"
			entries={filteredEntries}
			headers={HEADER_DEFINITIONS}
			slotProps={{
				addButton: {
					onClick: slotProps.addButton.onClick,
					disabled: slotProps.addButton.disabled,
					label: "ลงบันทึก",
				},
				searchField: {
					placeholder:
						"ค้นหาด้วยเลขทะเบียน, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
					value: search,
					onChange: setSearch,
				},
			}}
		/>
	);
};
