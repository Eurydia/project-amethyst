import { TRANSLATION } from "$locale/th";
import { DriverFormData } from "$types/models/Driver";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { DriverLicenseSelect } from "./DriverInputLicenseSelect";

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
			label: TRANSLATION.driverName,
			value: (
				<BaseInputTextField
					shouldAutoFocus
					isRequired
					placeholder={initFormData.name}
					value={fieldName}
					onChange={setFieldName}
				/>
			),
		},
		{
			label: TRANSLATION.driverSurname,
			value: (
				<BaseInputTextField
					isRequired
					value={fieldSurname}
					placeholder={initFormData.surname}
					onChange={setFielSurname}
				/>
			),
		},
		{
			label: TRANSLATION.driverContact,
			value: (
				<BaseInputTextField
					placeholder={initFormData.contact}
					value={fieldContact}
					onChange={setFieldContact}
				/>
			),
		},
		{
			label: TRANSLATION.driverLicenseType,
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
					children: TRANSLATION.globalPost,
				},
				cancelButton: {
					onClick: onCancel,
					children: TRANSLATION.globalCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
