import { fakerTH } from "@faker-js/faker";
import {
	AddRounded,
	CheckBox,
	SaveRounded,
} from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	ListSubheader,
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
	PickupRouteModel,
	VehicleModel,
} from "../types/models";
import { PickupRouteSelect } from "../components/PickupRouteSelect";

let uuid = 0;
const options: VehicleModel[] =
	fakerTH.helpers.multiple(
		() => {
			return {
				images: "",
				vendor_name: fakerTH.company.name(),
				license_plate: fakerTH.vehicle.vrm(),
				registered_city: fakerTH.location.city(),
				vehicle_assigned_driver: "",
				vehicle_assigned_routes: "",
				vehicle_class: fakerTH.vehicle.type(),

				id: (uuid++).toString(),
			};
		},
		{ count: 8 },
	);

export const PickupRouteNewPage: FC = () => {
	const submit = useSubmit();

	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				ลงทะเบียน สายรถ
			</Typography>
			<Stack spacing={2}>
				<TextField
					autoFocus
					required
					placeholder="ชื่อสาย"
				/>
				<TextField placeholder="ค้นหาทะเบียนรถ" />
				<Grid
					container
					spacing={1}
					columns={{ xs: 1, md: 2 }}
				>
					{options.map((option, index) => (
						<Grid
							item
							xs={1}
							key={"option" + index}
						>
							<FormControlLabel
								label={option.license_plate}
								control={<Checkbox />}
							/>
						</Grid>
					))}
				</Grid>
			</Stack>
			<Stack
				spacing={2}
				direction="row"
			>
				<Button
					disableElevation
					startIcon={<AddRounded />}
					variant="contained"
					onClick={tauriSaveNewDailyRecord}
				>
					เพิ่ม
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
