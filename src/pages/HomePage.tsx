import {
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { fakerTH } from "@faker-js/faker";
import { AttendanceChecklistWidget } from "../components/AttendanceChecklistWidget";

const dailyRecords = [
	{
		datetime: fakerTH.date.soon({
			days: 1,
		}),
		title: fakerTH.lorem.words(2),
		note: fakerTH.lorem.sentence(4),
		topics: fakerTH.lorem.words(2),
	},
	{
		datetime: fakerTH.date.soon({
			days: 1,
		}),
		title: fakerTH.lorem.word(),
		note: fakerTH.lorem.sentence(4),
		topics: fakerTH.lorem.words(2),
	},
	{
		datetime: fakerTH.date.soon({
			days: 1,
		}),
		title: fakerTH.lorem.sentence(),
		note: fakerTH.lorem.sentence(4),
		topics: "",
	},
];

export const HomePage: FC = () => {
	const submit = useSubmit();

	const navigateToDraft = () =>
		submit(
			{},
			{
				action: "/บันทึกประจำวัน/แบบร่าง",
			},
		);

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				บันทึกประจำวัน
			</Typography>
			<TableContainer>
				<Toolbar
					disableGutters
					variant="dense"
				>
					<Button
						disableElevation
						variant="contained"
						onClick={navigateToDraft}
					>
						เขียนบันทึก
					</Button>
				</Toolbar>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>เวลาและวันที่</TableCell>
							<TableCell>ชื่อเรื่อง</TableCell>
							<TableCell>หัวข้อ</TableCell>
							<TableCell>หมายเหตุ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dailyRecords.map((record, index) => (
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
									{record.title}
								</TableCell>
								<TableCell>
									{record.topics}
								</TableCell>
								<TableCell>
									{record.note}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<AttendanceChecklistWidget />
		</Stack>
	);
};
