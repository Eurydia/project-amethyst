import {
	AirportShuttleRounded,
	EditNoteRounded,
	PersonRounded,
	SearchRounded,
	TurnSlightRightRounded,
} from "@mui/icons-material";
import {
	Button,
	InputAdornment,
	Stack,
	TableContainer,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { filterItems } from "../core/filter";
import { TableHeaderDefinition } from "../types/generics";
import { SortableTable } from "./SortableTable";

const HEADER_DEFINITION: TableHeaderDefinition<RecordModel>[] =
	[
		{
			key: "datetime_iso",
			label: "เวลา",
			compare: (a, b) =>
				dayjs(a.datetime_iso)
					.locale("th")
					.unix() -
				dayjs(b.datetime_iso).locale("th").unix(),
			render: (item) =>
				dayjs(item.datetime_iso)
					.locale("th")
					.format("HH:mm น."),
		},
		{
			key: "title",
			label: "ชื่อเรื่อง",
			compare: (a, b) =>
				a.title.localeCompare(b.title),
			render: (item) => (
				<Link to={"daily-records/" + item.id}>
					<Typography>{item.title}</Typography>
				</Link>
			),
		},
		{
			key: "topics",
			label: "หัวข้อที่เกี่ยวข้อง",
			compare: null,
			render: (item) => (
				<Typography>{item.topics}</Typography>
			),
		},
	];

type TableToolbarProps = {
	search: string;
	onSearch: (value: string) => void;
};
const TableToolbar: FC<TableToolbarProps> = (
	props,
) => {
	const { onSearch, search } = props;

	const submit = useSubmit();

	return (
		<Toolbar
			disableGutters
			variant="dense"
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1,
				alignItems: "flex-start",
			}}
		>
			<Stack
				useFlexGap
				flexWrap="wrap"
				spacing={1}
				direction="row"
			>
				<Button
					startIcon={<EditNoteRounded />}
					disableElevation
					variant="contained"
					onClick={() =>
						submit(
							{},
							{
								action: "/daily-records/draft",
							},
						)
					}
				>
					บันทึกทั่วไป
				</Button>
				<Button
					startIcon={<TurnSlightRightRounded />}
					disableElevation
					variant="contained"
					onClick={() =>
						submit(
							{},
							{
								action: "/pickup-routes/draft",
							},
						)
					}
				>
					บันทึกสายรถ
				</Button>
				<Button
					startIcon={<AirportShuttleRounded />}
					disableElevation
					variant="contained"
					onClick={() =>
						submit(
							{},
							{
								action: "/vehicles/draft",
							},
						)
					}
				>
					แจ้งเคลม
				</Button>
				<Button
					startIcon={<PersonRounded />}
					disableElevation
					variant="contained"
					onClick={() =>
						submit(
							{},
							{
								action: "/records/driver/draft",
							},
						)
					}
				>
					ร้องเรียนคนขับ
				</Button>
			</Stack>
			<TextField
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchRounded />
						</InputAdornment>
					),
				}}
				fullWidth
				placeholder="ค้นหา"
				value={search}
				onChange={(e) => onSearch(e.target.value)}
			/>
		</Toolbar>
	);
};

type RecordTableProps = {
	rows: RecordModel[];
};
export const RecordTable: FC<RecordTableProps> = (
	props,
) => {
	const { rows } = props;

	const [search, setSearch] = useState("");

	const searchedEntries = useMemo(
		() =>
			filterItems(
				rows,
				search.normalize().split(" "),
				["title", "topics"],
			),
		[rows, search],
	);

	return (
		<TableContainer>
			<TableToolbar
				search={search}
				onSearch={setSearch}
			/>
			<SortableTable
				headers={HEADER_DEFINITION}
				defaultSortOrder="desc"
				defaultSortBy="datetime_iso"
				rows={searchedEntries}
			/>
		</TableContainer>
	);
};
