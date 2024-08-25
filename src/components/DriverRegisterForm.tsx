import { AddRounded } from "@mui/icons-material";
import {
	Button,
	Stack,
	TextField,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { DriverLicenseSelect } from "./DriverLicenseSelect";
import { DriverFormData } from "$types/form-data";

type DriverFormProps = {
	initFormData: DriverFormData;
	onSubmit: (formData: DriverFormData) => void;
	onCancel: () => void;
};
export const DriverForm: FC<DriverFormProps> = (
	props,
) => {
	const { initFormData, onCancel, onSubmit } =
		props;

	const [fieldName, setFieldName] = useState(
		initFormData.name,
	);
	const [fieldSurname, setFielSurname] = useState(
		initFormData.surname,
	);
	const [fieldContact, setFieldContact] =
		useState(initFormData.contact);
	const [fieldLicenseType, setFieldLicenseType] =
		useState<string | null>(
			initFormData.license_type,
		);

	const handleFieldContactChange = (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		setFieldContact(e.target.value);
	};

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		const formData: DriverFormData = {
			name: fieldName.trim().normalize(),
			surname: fieldSurname.trim().normalize(),
			contact: fieldContact.trim().normalize(),
			license_type: fieldLicenseType || "",
		};
		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const missingFieldName =
		fieldName.trim().normalize() === "";
	const missingFieldLastName =
		fieldSurname.trim().normalize() === "";

	const isFormIncomplete =
		missingFieldName || missingFieldLastName;

	return (
		<Stack spacing={2}>
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
					onChange={(e) =>
						setFieldName(e.target.value)
					}
					placeholder="ชื่อ"
				/>
				<TextField
					required
					fullWidth
					error={missingFieldLastName}
					value={fieldSurname}
					onChange={(e) =>
						setFielSurname(e.target.value)
					}
					placeholder="นามสกุล"
				/>
			</Stack>
			<TextField
				fullWidth
				placeholder="เบอร์ติดต่อ"
				value={fieldContact}
				onChange={handleFieldContactChange}
			/>
			<DriverLicenseSelect
				value={fieldLicenseType}
				onChange={setFieldLicenseType}
			/>
			<Stack
				useFlexGap
				spacing={2}
				direction="row"
			>
				<Button
					disabled={isFormIncomplete}
					disableElevation
					startIcon={<AddRounded />}
					variant="contained"
					onClick={handleSubmit}
				>
					ลงทะเบียน
				</Button>
				<Button
					disableElevation
					variant="outlined"
					onClick={handleCancel}
				>
					ยกเลิก
				</Button>
			</Stack>
		</Stack>
	);
};
