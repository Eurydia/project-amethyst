import { AddRounded } from "@mui/icons-material";
import {
	Stack,
	TextField,
	Button,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { DriverLicenseSelect } from "./DriverLicenseSelect";
import { DriverFormData } from "$types/models";

type DriverRegisterFormProps = {
	initFormData: DriverFormData;
	onSubmit: (formData: DriverFormData) => void;
	onCancel: () => void;
};
export const DriverRegisterForm: FC<
	DriverRegisterFormProps
> = (props) => {
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
		setFielSurname(event.target.value);
	};

	const handleSubmit = () => {
		if (
			missingFieldName ||
			missingFieldLastName
		) {
			return;
		}
		const formData: DriverFormData = {
			name: fieldName,
			surname: fieldSurname,
			contact: fieldContact,
			license_type: fieldLicenseType || "",
		};
		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const missingFieldName =
		fieldName.trim().normalize() === "";
	const missingFieldLastName =
		fieldSurname.trim().normalize() === "";

	return (
		<Stack>
			<DriverLicenseSelect
				value={fieldLicenseType}
				onChange={setFieldLicenseType}
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
					value={fieldSurname}
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
