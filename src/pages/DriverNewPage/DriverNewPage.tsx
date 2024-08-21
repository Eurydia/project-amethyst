import { DriverLicenseSelect } from "$components/DriverLicenseSelect";
import { AddRounded } from "@mui/icons-material";
import {
	Stack,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useSubmit } from "react-router-dom";

export const DriverNewPage: FC = () => {
	const submit = useSubmit();
	const [fieldName, setFieldName] = useState("");
	const [fieldLastName, setFieldLastName] =
		useState("");
	const [fieldContact, setFieldContact] =
		useState("");
	const [fieldLicenseType, setFieldLicenseType] =
		useState<string | null>("type1");

	const handleFieldContactChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setFieldContact(event.target.value);
	};
	const handleFieldNameChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setFieldName(event.target.value);
	};
	const handleFieldLastNameChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setFieldLastName(event.target.value);
	};

	const tauriSaveNewDailyRecord = () =>
		submit({}, { action: "/" });

	const cancelSave = () =>
		submit({}, { action: "/" });

	const missingFieldName =
		fieldName.trim().normalize() === "";
	const missingFieldLastName =
		fieldLastName.trim().normalize() === "";

	return (
		<Stack spacing={2}>
			<Stack spacing={1}>
				<Typography variant="h1">
					ลงทะเบียนคนขับรถ
				</Typography>
			</Stack>
			<DriverLicenseSelect
				onChange={setFieldLicenseType}
				value={fieldLicenseType}
			/>
			<Stack
				useFlexGap
				spacing={1}
				direction="row"
			>
				<TextField
					required
					fullWidth
					autoFocus
					error={missingFieldName}
					value={fieldName}
					onChange={handleFieldNameChange}
					placeholder="ชื่อ"
				/>
				<TextField
					required
					fullWidth
					error={missingFieldLastName}
					value={fieldLastName}
					onChange={handleFieldLastNameChange}
					placeholder="นามสกุล"
				/>
			</Stack>
			<TextField
				fullWidth
				placeholder="เบอร์ติดต่อ"
				value={fieldContact}
				onChange={handleFieldContactChange}
			/>
			<Stack
				useFlexGap
				spacing={2}
				direction="row"
			>
				<Button
					disableElevation
					startIcon={<AddRounded />}
					variant="contained"
					onClick={tauriSaveNewDailyRecord}
				>
					ลงทะเบียน
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
