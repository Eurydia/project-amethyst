import { filterItems } from "$core/filter";
import {
	MultiSelectOption,
	TableHeaderDefinition,
} from "$types/generics";
import { PickupRouteReportEntry } from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { BaseInputMultiSelect } from "./BaseInputMultiSelect";
import { BaseInputTopicMatchMode } from "./BaseInputTopicMatchMode";
import { BaseSortableTable } from "./BaseSortableTable";

const HEADER_DEFINITIONS: TableHeaderDefinition<PickupRouteReportEntry>[] =
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
			label: "สายรถ",
			compare: (a, b) =>
				a.routeName.localeCompare(b.routeName),
			render: (item) => (
				<Typography>
					<Link
						to={
							"/pickup-routes/info/" +
							item.routeId
						}
					>
						{item.routeName}
					</Link>
				</Typography>
			),
		},
		{
			label: "เรื่อง",
			compare: (a, b) =>
				a.title.localeCompare(b.title),
			render: (item) => (
				<Typography>
					<Link
						to={
							"/pickup-routes/report/general/info/" +
							item.id
						}
					>
						{item.title}
					</Link>
				</Typography>
			),
		},
		{
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) =>
				item.topics.length === 0 ? (
					<Typography fontWeight="bold">
						ไม่มี
					</Typography>
				) : (
					<Typography>
						{item.topics.join(", ")}
					</Typography>
				),
		},
	];

type PickupRouteReportGeneralTableProps = {
	entries: PickupRouteReportEntry[];
	slotProps: {
		addButton: {
			disabled?: boolean;
			onClick: () => void;
		};
		routeMultiSelect: {
			disabled?: boolean;
			options: MultiSelectOption[];
		};
		topicMultiSelect: {
			disabled?: boolean;
			options: MultiSelectOption[];
		};
	};
};
export const PickupRouteReportGeneralTable: FC<
	PickupRouteReportGeneralTableProps
> = (props) => {
	const { entries, slotProps } = props;

	const [search, setSearch] = useState("");
	const [afterDate, setAfterDate] =
		useState<Dayjs | null>(null);
	const [beforeDate, setBeforeDate] =
		useState<Dayjs | null>(null);
	const [topicMustHaveAll, setTopicMustHaveAll] =
		useState(false);
	const [topics, setTopics] = useState<string[]>(
		slotProps.topicMultiSelect.options.map(
			({ value }) => value,
		),
	);
	const [routes, setRoutes] = useState<string[]>(
		slotProps.routeMultiSelect.options.map(
			({ value }) => value,
		),
	);

	const filteredEntries = filterItems(
		entries,
		search,
		["title", "topics", "routeName"],
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
					disabled={
						slotProps.routeMultiSelect.disabled
					}
					options={
						slotProps.routeMultiSelect.options
					}
					selectedOptions={routes}
					onChange={setRoutes}
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
					disabled: slotProps.addButton.disabled,
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
