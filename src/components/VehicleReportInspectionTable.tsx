import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { VehicleReportInspectionEntryImpl } from "$types/impl/Vehicle";
import { VehicleReportInspectionEntry } from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseInputTopicMatchMode } from "./BaseInputTopicMatchMode";
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
	const [afterDate, setAfterDate] =
		useState<Dayjs | null>(null);
	const [beforeDate, setBeforeDate] =
		useState<Dayjs | null>(null);
	const [topicMustHaveAll, setTopicMustHaveAll] =
		useState(false);
	const [topics, setTopics] = useState(
		slotProps.topicMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const [vehicles, setVehicles] = useState(
		slotProps.vehicleMultiSelect.options.map(
			({ value }) => value,
		),
	);

	const filteredEntries =
		VehicleReportInspectionEntryImpl.filter(
			entries,
			afterDate,
			beforeDate,
			vehicles,
			topics,
			topicMustHaveAll,
			search,
		);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ลงบันทึกหลัง",
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
			label: "ลงบันทึกก่อน",
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
			label: "เลขทะเบียน",
			value: (
				<BaseInputMultiSelect
					disabled={
						slotProps.vehicleMultiSelect.disabled
					}
					options={
						slotProps.vehicleMultiSelect.options
					}
					selectedOptions={vehicles}
					onChange={setVehicles}
				/>
			),
		},
		{
			label: "ประเภทการกรองหัวข้อ",
			value: (
				<BaseInputTopicMatchMode
					value={topicMustHaveAll}
					onChange={setTopicMustHaveAll}
				/>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<BaseInputMultiSelect
					options={
						slotProps.topicMultiSelect.options
					}
					selectedOptions={topics}
					onChange={setTopics}
				/>
			),
		},
	];

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
		>
			{formItems}
		</BaseSortableTable>
	);
};
