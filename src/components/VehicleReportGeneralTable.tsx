import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleReportGeneralEntry } from "$types/models/Vehicle";
import {
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
	FC,
	ReactNode,
	useMemo,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseMultiSelect } from "./BaseMultiSelect";

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
						.format("HH:mm น. DD/MM/YYYY")}
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
			render: ({ topics }) => (
				<Typography>
					{topics.join(", ")}
				</Typography>
			),
		},
	];

const entriesToOptions = (
	entries: VehicleReportGeneralEntry[],
) => {
	const uniqVehicles: Record<string, string> = {};
	const uniqTopics = new Set<string>();
	for (const entry of entries) {
		uniqVehicles[entry.vehicleId] =
			entry.vehicleLicensePlate;

		for (const topic of entry.topics) {
			uniqTopics.add(topic);
		}
	}
	const vehicleOptions = Object.entries(
		uniqVehicles,
	).map(([value, label]) => ({
		value,
		label,
	}));

	const topicOptions = [...uniqTopics].map(
		(topic) => ({
			value: topic,
			label: topic,
		}),
	);
	return {
		vehicleOptions,
		topicOptions,
	};
};

const filterEntries = (
	entries: VehicleReportGeneralEntry[],
	afterDate: Dayjs | null,
	beforeDate: Dayjs | null,
	selectedVehicles: string[],
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
	const vehicleSet = new Set(selectedVehicles);

	return items
		.filter((entry) =>
			vehicleSet.has(entry.vehicleId),
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
	entries: VehicleReportGeneralEntry[],
	search: string,
) => {
	return filterItems(entries, search, [
		"title",
		"topics",
		"vehicleLicensePlate",
	]);
};

type VehicleReportGeneralTableProps = {
	entries: VehicleReportGeneralEntry[];
	onAdd: () => void;
};
export const VehicleReportGeneralTable: FC<
	VehicleReportGeneralTableProps
> = (props) => {
	const { onAdd, entries } = props;

	const { vehicleOptions, topicOptions } =
		useMemo(
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
	const [selectedVehicles, setSelectedVehicles] =
		useState(
			vehicleOptions.map(({ value }) => value),
		);

	const filteredEntries = useMemo(
		() =>
			filterEntries(
				entries,
				afterDate,
				beforeDate,
				selectedVehicles,
				selectedTopics,
				topicMustHaveAll === "yes",
			),
		[
			afterDate,
			beforeDate,
			selectedVehicles,
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
			label: "เลขทะเบียนรถ",
			value: (
				<BaseMultiSelect
					options={vehicleOptions}
					selectedOptions={selectedVehicles}
					onChange={setSelectedVehicles}
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
				<BaseMultiSelect
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
			headers={HEADER_DEFINITIONS}
			slotProps={{
				addButton: {
					onClick: onAdd,
					children: "ลงบันทึก",
				},
				searchField: {
					placeholder:
						"ค้นหาเรื่องร้องเรียนรถ (ด้วยเลขทะเบียน, เรื่อง หรือหัวข้อ)",
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
