import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteReportEntry } from "$types/models/PickupRoute";
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
			rotueSet.has(entry.routeId.toString()),
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
	entries: PickupRouteReportEntry[];
	slotProps: {
		addButton: {
			onClick: () => void;
		};
	};
};
export const PickupRouteReportTable: FC<
	PickupRouteReportTableProps
> = (props) => {
	const { headers, entries, slotProps } = props;

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
		useState(false);
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
				topicMustHaveAll,
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
			label: "สายรถ",
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
				<BaseInputTopicMatchMode
					onChange={setTopicMustHaveAll}
					value={topicMustHaveAll}
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
					onClick: slotProps.addButton.onClick,
					label: "ลงบันทึก",
				},
				searchField: {
					placeholder:
						"ค้นหาด้วยสายรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
					value: search,
					onChange: setSearch,
				},
			}}
		>
			{formItems}
		</BaseSortableTable>
	);
};
