import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReport } from "$types/models";
import {
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { MultiSelect } from "./MultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const entriesToOptions = (
	entries: DriverReport[],
): {
	driverOptions: {
		value: string;
		label: string;
	}[];
	topicOptions: {
		value: string;
		label: string;
	}[];
} => {
	const uniqueDrivers: Record<string, string> =
		{};
	const uniqueTopics = new Set<string>();
	for (const entry of entries) {
		uniqueDrivers[
			entry.driver_id
		] = `${entry.driver_name} ${entry.driver_surname}`;

		for (const topic of entry.topics) {
			uniqueTopics.add(topic);
		}
	}
	const driverOptions = Object.entries(
		uniqueDrivers,
	).map(([value, label]) => ({
		value,
		label,
	}));

	const topicOptions = [...uniqueTopics].map(
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
	entries: DriverReport[],
	afterDate: Dayjs | null,
	beforeDate: Dayjs | null,
	selectedDrivers: string[],
	selectedTopics: string[],
	topicMustHaveAll: boolean,
): DriverReport[] => {
	let items = entries;
	if (afterDate !== null) {
		items = items.filter((entry) =>
			dayjs(entry.datetime).isAfter(afterDate),
		);
	}
	if (beforeDate !== null) {
		items = items.filter((entry) =>
			dayjs(entry.datetime).isBefore(beforeDate),
		);
	}
	const driverSet = new Set(selectedDrivers);

	return items
		.filter((entry) =>
			driverSet.has(entry.driver_id),
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
	search: string,
	entries: DriverReport[],
): DriverReport[] => {
	const tokens = search
		.normalize()
		.split(" ")
		.map((token) => token.trim())
		.filter((token) => token.length > 0);

	return filterItems(entries, tokens, [
		"title",
		"topics",
		"driver_name",
		"driver_surname",
	]);
};

type DriverReportTableProps = {
	headers: TableHeaderDefinition<DriverReport>[];
	searchPlaceholder?: string;
	entries: DriverReport[];
	onAdd: () => void;
};
export const DriverReportTable: FC<
	DriverReportTableProps
> = (props) => {
	const {
		headers,
		entries,
		searchPlaceholder,
		onAdd,
	} = props;

	const { driverOptions, topicOptions } = useMemo(
		() => entriesToOptions(entries),
		[entries],
	);

	const [search, setSearch] = useState("");
	const [afterDate, setAfterDate] =
		useState<Dayjs | null>(null);
	const [beforeDate, setBeforeDate] =
		useState<Dayjs | null>(null);
	const [topicMustHaveAll, setTopicMustHaveAll] =
		useState("no");
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
				afterDate,
				beforeDate,
				selectedDrivers,
				selectedTopics,
				topicMustHaveAll === "yes",
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
		() => searchEntries(search, filteredEntries),
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
				<MultiSelect
					options={driverOptions}
					selectedOptions={selectedDrivers}
					onChange={setSelectedDrivers}
				/>
			),
		},
		{
			label: "ประเภทการกรองหัวข้อ",
			value: (
				<RadioGroup
					row
					value={topicMustHaveAll}
					onChange={(e) =>
						setTopicMustHaveAll(e.target.value)
					}
				>
					<FormControlLabel
						value="yes"
						control={<Radio />}
						label="มีทุกหัวข้อที่เลือก"
					/>
					<FormControlLabel
						value="no"
						control={<Radio />}
						label="มีอย่างน้อยหนึ่งหัวข้อที่เลือก"
					/>
				</RadioGroup>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			value: (
				<MultiSelect
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
					onClick: onAdd,
					children: "ลงบันทึก",
				},
				searchField: {
					placeholder: searchPlaceholder,
					value: search,
					onChange: (e) =>
						setSearch(e.target.value),
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};
