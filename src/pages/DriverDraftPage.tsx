import {
	fakerTH,
	fakerTR,
} from "@faker-js/faker";
import { SaveRounded } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	ListItemText,
	Menu,
	MenuItem,
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

let uuid = 0;
const option = fakerTH.helpers.multiple(
	() => {
		return {
			label: fakerTH.person.firstName(),
			id: uuid++,
		};
	},
	{ count: 8 },
);

export const DriverDraftPage: FC = () => {
	const submit = useSubmit();
	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แบบร่าง ร้องเรียนคนขับ
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
				<Select
					defaultValue=""
					displayEmpty
					renderValue={(value) => {
						if (value === "") {
							return "เลือกคนขับ";
						}
						return value;
					}}
				>
					<MenuItem
						disabled
						value=""
					>
						เลือกคนขับ
					</MenuItem>
					{option.map((item) => (
						<MenuItem
							key={item.id}
							value={item.id}
						>
							<ListItemText>
								{item.label}
							</ListItemText>
						</MenuItem>
					))}
				</Select>
				<TextField
					autoFocus
					placeholder="เรื่อง"
				/>
				<TextField
					multiline
					minRows={5}
					placeholder="รายละเอียด"
				/>
			</Stack>
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
