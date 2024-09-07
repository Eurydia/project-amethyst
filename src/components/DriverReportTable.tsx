import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { DriverReportEntryImpl } from "$types/impl/Driver";
import { DriverReportEntry } from "$types/models/Driver";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseInputTopicMatchMode } from "./BaseInputTopicMatchMode";
import { BaseSortableTable } from "./BaseSortableTable";

type DriverReportTableProps = {
	headers: TableHeaderDefinition<DriverReportEntry>[];
	entries: DriverReportEntry[];
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
		driverMultiSelect: {
			disabled?: boolean;
			options: MultiSelectOption[];
		};
		topicMultiSelect: {
			options: MultiSelectOption[];
		};
	};
};
export const DriverReportTable: FC<
	DriverReportTableProps
> = (props) => {
	const { headers, entries, slotProps } = props;

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
	const [drivers, setDrivers] = useState(
		slotProps.driverMultiSelect.options.map(
			({ value }) => value,
		),
	);

	const filteredEntries =
		DriverReportEntryImpl.filter(
			entries,
			drivers,
			afterDate,
			beforeDate,
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
			label: "คนขับรถ",
			value: (
				<BaseInputMultiSelect
					disabled={
						slotProps.driverMultiSelect.disabled
					}
					options={
						slotProps.driverMultiSelect.options
					}
					selectedOptions={drivers}
					onChange={setDrivers}
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
			headers={headers}
			slotProps={{
				addButton: {
					label: "ลงบันทึก",
					onClick: slotProps.addButton.onClick,
				},
				searchField: {
					value: search,
					placeholder:
						"ค้นหาด้วยชื่อนามสกุลคนขับรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
					onChange: setSearch,
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};
