import { filterItems } from "$core/filter";
import { TRANSLATION } from "$locale/th";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteReportEntry } from "$types/models/PickupRoute";
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
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseSortableTable } from "./BaseSortableTable";

const toOptions = (
	entries: PickupRouteReportEntry[],
) => {
	const routes: Record<string, string> = {};
	const topics = new Set<string>();
	for (const entry of entries) {
		routes[entry.routeId] = entry.routeName;
		for (const topic of entry.topics) {
			topics.add(topic);
		}
	}
	const routeOptions = Object.entries(routes).map(
		([value, label]) => ({
			value,
			label,
		}),
	);
	const topicOptions = [...topics].map(
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
	entries: PickupRouteReportEntry[],
	afterDate: Dayjs | null,
	beforeDate: Dayjs | null,
	selectedRoutes: string[],
	selectedTopics: string[],
	topicMustHaveAll: boolean,
) => {
	const items = entries
		.filter(
			({ datetime }) =>
				afterDate !== null ||
				dayjs(datetime).isAfter(afterDate),
		)
		.filter(
			({ datetime }) =>
				beforeDate !== null ||
				dayjs(datetime).isBefore(beforeDate),
		);
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
	entries: PickupRouteReportEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"title",
		"topics",
		"routeName",
	]);
};

type PickupRouteReportTableProps = {
	headers: TableHeaderDefinition<PickupRouteReportEntry>[];
	searchPlaceholder?: string;
	entries: PickupRouteReportEntry[];
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
		() => toOptions(entries),
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
			label: TRANSLATION.pickupRoute,
			value: (
				<BaseInputMultiSelect
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
