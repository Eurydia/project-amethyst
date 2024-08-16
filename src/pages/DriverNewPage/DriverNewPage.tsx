import { AddRounded } from "@mui/icons-material";
import {
	Stack,
	Typography,
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	Button,
} from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";

export const DriverNewPage: FC = () => {
	const submit = useSubmit();

	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แบบร่าง เพิ่มคนขับ
			</Typography>

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
