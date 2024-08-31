import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteReport } from "$types/models";
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
import { BaseSortableTable } from "./BaseSortableTable";
import { MultiSelect } from "./MultiSelect";

const entriesToOptions = (
	entries: PickupRouteReport[],
): {
	routeOptions: {
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
		uniqueDrivers[entry.routeId] =
			entry.routeName;

		for (const topic of entry.topics) {
			uniqueTopics.add(topic);
		}
	}
	const routeOptions = Object.entries(
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
		routeOptions,
		topicOptions,
	};
};

const filterEntries = (
	entries: PickupRouteReport[],
	afterDate: Dayjs | null,
	beforeDate: Dayjs | null,
	selectedRoutes: string[],
	selectedTopics: string[],
	topicMustHaveAll: boolean,
) => {
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
	const rotueSet = new Set(selectedRoutes);

	return items
		.filter((entry) =>
			rotueSet.has(entry.routeId),
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
	entries: PickupRouteReport[],
) => {
	const tokens = search
		.normalize()
		.split(" ")
		.map((token) => token.trim())
		.filter((token) => token.length > 0);

	return filterItems(entries, tokens, [
		"title",
		"topics",
		"routeName",
	]);
};

type PickupRouteReportTableProps = {
	headers: TableHeaderDefinition<PickupRouteReport>[];
	searchPlaceholder?: string;
	entries: PickupRouteReport[];
	onAdd: () => void;
};
export const PickupRouteReportTable: FC<
	PickupRouteReportTableProps
> = (props) => {
	const {
		headers,
		entries,
		searchPlaceholder,
		onAdd,
	} = props;

	const { routeOptions, topicOptions } = useMemo(
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
	const [selectedRoutes, setSelectedRoutes] =
		useState(
			routeOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(
		() =>
			filterEntries(
				entries,
				afterDate,
				beforeDate,
				selectedRoutes,
				selectedTopics,
				topicMustHaveAll === "yes",
			),
		[
			afterDate,
			beforeDate,
			selectedRoutes,
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
			label: "สายรถ",
			value: (
				<MultiSelect
					options={routeOptions}
					selectedOptions={selectedRoutes}
					onChange={setSelectedRoutes}
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
