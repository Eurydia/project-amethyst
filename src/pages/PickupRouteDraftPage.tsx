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
	useState,
} from "react";
import { useSubmit } from "react-router-dom";
import { DriverSelect } from "../components/DriverSelect";
import { PickupRouteModel } from "../types/models";
import { PickupRouteSelect } from "../components/PickupRouteSelect";

let uuid = 0;
const options: PickupRouteModel[] =
	fakerTH.helpers.multiple(
		() => {
			return {
				assigned_vehicle_ids: "",
				name: fakerTH.location.city(),
				id: (uuid++).toString(),
			};
		},
		{ count: 8 },
	);

export const PickupRouteDraftPage: FC = () => {
	const [pickupRoute, setPickupRoute] =
		useState<PickupRouteModel | null>(null);
	const submit = useSubmit();

	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แบบร่าง บันทึกสายรถ
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
				<PickupRouteSelect
					options={options}
					value={pickupRoute}
					onChange={setPickupRoute}
				/>
				<TextField
					autoFocus
					required
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
