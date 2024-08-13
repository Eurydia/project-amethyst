import { SaveRounded } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	DateField,
	TimeField,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
	FC,
	useEffect,
	useReducer,
	useRef,
} from "react";
import { useSubmit } from "react-router-dom";

const option = [
	{
		label: "เคลมรถ",
		value: "เคลมรถ",
		category: "ระบบ",
	},
	{
		label: "ร้องเรียนคนขับ",
		value: "ร้องเรียนคนขับ",
		category: "ระบบ",
	},
	{
		label: "สายหนึ่ง",
		value: "สายหนึ่ง",
		category: "สายรถ",
	},
	{
		label: "สายสอง",
		value: "สายสอง",
		category: "สายรถ",
	},
	{
		label: "นายแดง",
		value: "นายแดง",
		category: "คนขับรถ",
	},
	{
		label: "นายเขียว",
		value: "นายเขียว",
		category: "คนขับรถ",
	},
	{
		label: "กก 1",
		value: "กก 1",
		category: "รถ",
	},
	{
		label: "กก 2",
		value: "กก 2",
		category: "รถ",
	},
];

export const DailyRecordDraftPage: FC = () => {
	const submit = useSubmit();
	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แบบร่าง บันทึกประจำวัน
			</Typography>
			<Stack spacing={2}>
				<Stack
					direction="row"
					spacing={2}
				>
					<DateField
						label="วัน/เดือน/ปี"
						fullWidth
						defaultValue={dayjs()}
						format="DD/MM/YYYY"
					/>
					<TimeField
						fullWidth
						label="เวลา"
						defaultValue={dayjs()}
						format="HH:mm น."
					/>
				</Stack>
				<TextField
					autoFocus
					label="เรื่อง"
				/>
				<TextField
					multiline
					minRows={5}
					label="รายละเอียด"
				/>
			</Stack>
			<Autocomplete
				disablePortal
				freeSolo
				multiple
				disableCloseOnSelect
				ChipProps={{
					sx: {
						borderRadius: 0,
					},
				}}
				options={option}
				groupBy={(option) => option.category}
				renderInput={(params) => (
					<TextField
						{...params}
						label="หัวข้อที่เกี่ยวข้อง"
					/>
				)}
			/>
			<Stack
				spacing={2}
				direction="row"
			>
				<Button
					disableElevation
					startIcon={<SaveRounded />}
					variant="contained"
					onClick={tauriSaveNewDailyRecord}
				>
					บันทึก
				</Button>
				<Button
					disableElevation
					variant="outlined"
					onClick={cancelSave}
				>
					ยกเลิก
				</Button>
			</Stack>
		</Stack>
	);
};
