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
import {
	DriverModel,
	VehicleModel,
} from "../types/models";
import { VehicleSelect } from "../components/VehicleSelect";

let uuid = 0;
const options: VehicleModel[] =
	fakerTH.helpers.multiple(
		() => {
			return {
				images: "",
				vendor_name: fakerTR.company.name(),
				license_plate: fakerTR.vehicle.vrm(),
				registered_city: fakerTR.location.city(),
				vehicle_assigned_driver: "",
				vehicle_assigned_routes: "",
				vehicle_class: fakerTR.vehicle.type(),

				id: (uuid++).toString(),
			};
		},
		{ count: 8 },
	);

export const VehicleDraftPage: FC = () => {
	const [vehicle, setVehicle] =
		useState<VehicleModel | null>(null);
	const submit = useSubmit();
	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แบบร่าง แจ้งเคลม
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
				<VehicleSelect
					options={options}
					value={vehicle}
					onChange={setVehicle}
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
