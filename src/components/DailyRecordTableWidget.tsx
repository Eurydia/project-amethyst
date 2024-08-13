import { fakerTH } from "@faker-js/faker";
import {
	TableContainer,
	Toolbar,
	Typography,
	Button,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Stack,
	TextField,
	InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { filterItems } from "../core/filter";
import {
	AirportShuttleRounded,
	EditNoteRounded,
	PersonRemove,
	PersonRounded,
	Search,
	SearchRounded,
} from "@mui/icons-material";

const dailyRecords = fakerTH.helpers.multiple(
	() => {
		return {
			datetime: fakerTH.date.soon({
				days: 1,
			}),
			title: fakerTH.lorem.words({
				min: 1,
				max: 3,
			}),
			note: fakerTH.lorem.sentence({
				min: 1,
				max: 3,
			}),
			topics: fakerTH.lorem.words({
				min: 1,
				max: 3,
			}),
		};
	},
	{ count: 4 },
);

export const DailyRecordTableWidget: FC = () => {
	const submit = useSubmit();
	const [search, setSearch] = useState("");

	const navigateToDraft = () =>
		submit(
			{},
			{
				action: "/daily-records/draft",
			},
		);

	const searchedEntries = filterItems(
		dailyRecords,
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
					spacing={1}
					direction="row"
				>
					<Button
						startIcon={<EditNoteRounded />}
						disableElevation
						variant="contained"
						onClick={navigateToDraft}
					>
						เขียนบันทึกทั่วไป
					</Button>
					<Button
						startIcon={<AirportShuttleRounded />}
						disableElevation
						variant="contained"
						onClick={navigateToDraft}
					>
						เขียนบันทึกการเคลม
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
						เขียนบันทึกการร้อนเรียนคนขับ
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
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>เวลา</TableCell>
						<TableCell>ชื่อเรื่อง</TableCell>
						<TableCell>
							หัวข้อที่เกี่ยวข้อง
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{searchedEntries.map(
						(record, index) => (
							<TableRow
								key={"record" + index}
								hover
							>
								<TableCell>
									{dayjs(record.datetime)
										.locale("th")
										.format("HH:mm น. ")}
								</TableCell>
								<TableCell>
									<Link
										to={"daily-records/" + index}
									>
										<Typography>
											{record.title}
										</Typography>
									</Link>
								</TableCell>
								<TableCell>
									{record.topics}
								</TableCell>
							</TableRow>
						),
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
