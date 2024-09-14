import { filterItems } from "$core/filter";
import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { VehicleReportInspectionEntry } from "$types/models/vehicle-report-inspection";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<VehicleReportInspectionEntry>[] =
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
			label: "เลขทะเบียนรถ",
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
			label: "ผลการตรวจสภาพรถ",
			compare: null,
			render: ({ inspectionRoundNumber, id }) => (
				<Typography
					component={Link}
					to={
						"/vehicles/report/inspection/info/" +
						id
					}
				>
					{`รอบที่ ${inspectionRoundNumber}`}
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

type VehicleReportInspectionTableProps = {
	entries: VehicleReportInspectionEntry[];
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
		vehicleMultiSelect: {
			disabled?: boolean;
			options: MultiSelectOption[];
		};
		topicMultiSelect: {
			options: MultiSelectOption[];
		};
	};
};
export const VehicleReportInspectionTable: FC<
	VehicleReportInspectionTableProps
> = (props) => {
	const { slotProps, entries } = props;

	const [search, setSearch] = useState("");
	const filteredEntries = filterItems(
		entries,
		search,
		[
			"title",
			"topics",
			"vehicleLicensePlate",
			"inspectionRoundNumber",
		],
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
						"ค้นหาด้วยเลขทะเบียน, รอบการตรวจ หรือหัวข้อที่เกี่ยวข้อง",
					value: search,
					onChange: setSearch,
				},
			}}
		/>
	);
};
