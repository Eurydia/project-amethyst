import { DriverFormData } from "$types/models/Driver";
import { TextField } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { DriverLicenseSelect } from "./DriverLicenseSelect";

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
		useState(initFormData.licenseType);

	const handleCancel = () => onCancel();
	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		const formData: DriverFormData = {
			name: fieldName.trim().normalize(),
			surname: fieldSurname.trim().normalize(),
			contact: fieldContact.trim().normalize(),
			licenseType: fieldLicenseType
				.trim()
				.normalize(),
		};
		onSubmit(formData);
	};

	const missingFieldName =
		fieldName.trim().normalize() === "";
	const missingFieldSurname =
		fieldSurname.trim().normalize() === "";

	const isFormIncomplete =
		missingFieldName || missingFieldSurname;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อ",
			value: (
				<TextField
					fullWidth
					autoFocus
					error={missingFieldName}
					value={fieldName}
					onChange={(e) =>
						setFieldName(e.target.value)
					}
					placeholder={initFormData.name}
				/>
			),
		},
		{
			label: "นามสกุล",
			value: (
				<TextField
					fullWidth
					error={missingFieldSurname}
					value={fieldSurname}
					onChange={(e) =>
						setFielSurname(e.target.value)
					}
					placeholder={initFormData.surname}
				/>
			),
		},
		{
			label: "เบอร์ติดต่อ",
			value: (
				<TextField
					fullWidth
					placeholder={initFormData.contact}
					value={fieldContact}
					onChange={(e) =>
						setFieldContact(e.target.value)
					}
				/>
			),
		},
		{
			label: "ประเภทใบขับขี่",
			value: (
				<DriverLicenseSelect
					value={fieldLicenseType}
					onChange={setFieldLicenseType}
				/>
			),
		},
	];

	return (
		<BaseForm
			slotProps={{
				submitButton: {
					disabled: isFormIncomplete,
					onClick: handleSubmit,
				},
				cancelButton: {
					onClick: handleCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
