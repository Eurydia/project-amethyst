import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReportEntry } from "$types/models/Driver";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseInputTopicMatchMode } from "./BaseInputTopicMatchMode";
import { BaseSortableTable } from "./BaseSortableTable";

const toOptions = (
	entries: DriverReportEntry[],
) => {
	const drivers: Record<string, string> = {};
	const topics = new Set<string>();
	for (const entry of entries) {
		drivers[
			entry.driverId
		] = `${entry.driverName} ${entry.driverSurname}`;

		for (const topic of entry.topics) {
			topics.add(topic);
		}
	}
	const driverOptions = Object.entries(
		drivers,
	).map(([value, label]) => ({
		value,
		label,
	}));

	const topicOptions = [...topics].map(
		(topic) => ({
			value: topic,
			label: topic,
		}),
	);
	return {
		driverOptions,
		topicOptions,
	};
};

const filterEntries = (
	entries: DriverReportEntry[],
	selectedDrivers: string[],
	afterDate: Dayjs | null,
	beforeDate: Dayjs | null,
	selectedTopics: string[],
	topicMustHaveAll: boolean,
) => {
	const driverSet = new Set(selectedDrivers);
	return entries
		.filter(
			(entry) =>
				afterDate === null ||
				dayjs(entry.datetime).isAfter(afterDate),
		)
		.filter(
			(entry) =>
				beforeDate === null ||
				dayjs(entry.datetime).isBefore(
					beforeDate,
				),
		)
		.filter((entry) =>
			driverSet.has(entry.driverId),
		)
		.filter((entry) => {
			const topicSet = new Set(entry.topics);
			return topicMustHaveAll
				? selectedTopics.every((topic) =>
						topicSet.has(topic),
				  )
				: selectedTopics.some((topic) =>
						topicSet.has(topic),
				  );
		});
};

const searchEntries = (
	entries: DriverReportEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"title",
		"topics",
		"driver_name",
		"driver_surname",
	]);
};

type DriverReportTableProps = {
	headers: TableHeaderDefinition<DriverReportEntry>[];
	entries: DriverReportEntry[];
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const DriverReportTable: FC<
	DriverReportTableProps
> = (props) => {
	const { headers, entries, slotProps } = props;

	const { driverOptions, topicOptions } = useMemo(
		() => toOptions(entries),
		[entries],
	);

	const [search, setSearch] = useState("");
	const [afterDate, setAfterDate] =
		useState<Dayjs | null>(null);
	const [beforeDate, setBeforeDate] =
		useState<Dayjs | null>(null);
	const [topicMustHaveAll, setTopicMustHaveAll] =
		useState(false);
	const [selectedTopics, setSelectedTopics] =
		useState(
			topicOptions.map(({ value }) => value),
		);
	const [selectedDrivers, setSelectedDrivers] =
		useState(
			driverOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(
		() =>
			filterEntries(
				entries,
				selectedDrivers,
				afterDate,
				beforeDate,
				selectedTopics,
				topicMustHaveAll,
			),
		[
			afterDate,
			beforeDate,
			selectedDrivers,
			selectedTopics,
			entries,
			topicMustHaveAll,
		],
	);
	const searchedEntries = useMemo(
		() => searchEntries(filteredEntries, search),
		[search, filteredEntries],
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
					options={driverOptions}
					selectedOptions={selectedDrivers}
					onChange={setSelectedDrivers}
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
					options={topicOptions}
					selectedOptions={selectedTopics}
					onChange={setSelectedTopics}
				/>
			),
		},
	];

	return (
		<BaseSortableTable
			defaultSortByColumn={0}
			defaultSortOrder="desc"
			entries={searchedEntries}
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
