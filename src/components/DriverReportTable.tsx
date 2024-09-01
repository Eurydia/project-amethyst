import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverReportEntry } from "$types/models/Driver";
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

type DriverReportTableProps = {
	headers: TableHeaderDefinition<DriverReportEntry>[];
	searchPlaceholder?: string;
	entries: DriverReportEntry[];
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

	const { driverOptions, topicOptions } =
		useMemo(() => {
			const uniqueDrivers: Record<
				string,
				string
			> = {};
			const uniqueTopics = new Set<string>();
			for (const entry of entries) {
				uniqueDrivers[
					entry.driverId
				] = `${entry.driverName} ${entry.driverSurname}`;

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
		}, [entries]);

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

	const filteredEntries = useMemo(() => {
		const driverSet = new Set(selectedDrivers);
		return entries
			.filter(
				(entry) =>
					afterDate === null ||
					dayjs(entry.datetime).isAfter(
						afterDate,
					),
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
	}, [
		afterDate,
		beforeDate,
		selectedDrivers,
		selectedTopics,
		entries,
		topicMustHaveAll,
	]);
	const searchedEntries = useMemo(() => {
		return filterItems(entries, search, [
			"title",
			"topics",
			"driver_name",
			"driver_surname",
		]);
	}, [search, filteredEntries]);

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
