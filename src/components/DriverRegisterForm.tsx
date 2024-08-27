import { DriverFormData } from "$types/form-data";
import { AddRounded } from "@mui/icons-material";
import {
	Grid,
	TextField
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { DriverLicenseSelect } from "./DriverLicenseSelect";
import { TypographyButton } from "./TypographyButton";

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
		useState(initFormData.license_type);

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
			license_type: fieldLicenseType,
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
		<Grid
			container
			spacing={1}
		>
			<Grid
				item
				xs={12}
				md={6}
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
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
			>
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
			</Grid>
			<Grid
				item
				xs={12}
			>
				<TextField
					fullWidth
					placeholder="เบอร์ติดต่อ"
					value={fieldContact}
					onChange={handleFieldContactChange}
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<DriverLicenseSelect
					value={fieldLicenseType}
					onChange={setFieldLicenseType}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				display="flex"
				flexDirection="row"
				flexWrap="wrap"
				gap={1}
			>
				<TypographyButton
					disabled={isFormIncomplete}
					startIcon={<AddRounded />}
					variant="contained"
					onClick={handleSubmit}
				>
					ลงทะเบียน
				</TypographyButton>
				<TypographyButton
					variant="outlined"
					onClick={handleCancel}
				>
					ยกเลิก
				</TypographyButton>
			</Grid>
		</Grid>
	);
};
