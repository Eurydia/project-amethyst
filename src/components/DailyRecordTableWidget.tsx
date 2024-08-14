import { fakerTH } from "@faker-js/faker";
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
import { FC, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { filterItems } from "../core/filter";
import { TableHeaderDefinition } from "../types/generics";
import { DailyRecordModel } from "../types/models";
import { SortableTable } from "./SortableTable";

let id = 0;
const items: DailyRecordModel[] =
	fakerTH.helpers.multiple(
		() => {
			const now_date = new Date(Date.now());
			now_date.setMinutes(
				Math.floor(Math.random() * 60),
			);

			return {
				datetime_iso: now_date.toISOString(),
				title: fakerTH.lorem.words({
					min: 1,
					max: 3,
				}),
				content: "",
				topics: fakerTH.lorem.words({
					min: 1,
					max: 3,
				}),
				id: (id++).toString(),
			};
		},
		{ count: 4 },
	);

Array.prototype.sort();

const HEADER_DEFINITION: TableHeaderDefinition<DailyRecordModel>[] =
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
					.format("HH:mm น. "),
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

export const DailyRecordTableWidget: FC = () => {
	const submit = useSubmit();
	const [search, setSearch] = useState("");

	const searchedEntries = filterItems(
		items,
		search.normalize().split(" "),
		["title", "topics"],
	);

	return (
		<TableContainer>
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
				<Typography variant="h2">
					บันทึกประจำวัน
				</Typography>
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
									action: "/drivers/draft",
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
					onChange={(e) =>
						setSearch(e.target.value)
					}
				/>
			</Toolbar>

			<SortableTable
				headers={HEADER_DEFINITION}
				defaultOrder="desc"
				defaultOrderBy="datetime_iso"
				rows={searchedEntries}
			/>
		</TableContainer>
	);
};
