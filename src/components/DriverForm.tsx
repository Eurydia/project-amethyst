import { DriverFormData } from "$types/models/Driver";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";
import { DriverLicenseSelect } from "./DriverInputLicenseSelect";

type DriverFormProps = {
	initFormData: DriverFormData;

	slotProps: {
		submitButton: {
			startIcon: ReactNode;
			label: string;
			onClick: (formData: DriverFormData) => void;
		};
		cancelButton: {
			label: string;
			onClick: () => void;
		};
	};
};
export const DriverForm: FC<DriverFormProps> = (
	props,
) => {
	const { initFormData, slotProps } = props;

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
		slotProps.submitButton.onClick({
			name: fieldName.trim().normalize(),
			surname: fieldSurname.trim().normalize(),
			contact: fieldContact.trim().normalize(),
			licenseType: fieldLicenseType,
		});
	};

	const isMissingName =
		fieldName.trim().normalize() === "";
	const isMissingSurname =
		fieldSurname.trim().normalize() === "";
	const isFormIncomplete =
		isMissingName || isMissingSurname;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อ",
			value: (
				<BaseInputTextField
					shouldAutoFocus
					isError={isMissingName}
					placeholder={initFormData.name}
					value={fieldName}
					onChange={setFieldName}
				/>
			),
		},
		{
			label: "นามสกุล",
			value: (
				<BaseInputTextField
					isError={isMissingSurname}
					value={fieldSurname}
					placeholder={initFormData.surname}
					onChange={setFielSurname}
				/>
			),
		},
		{
			label: "เบอร์ติดต่อ",
			value: (
				<BaseInputTextField
					placeholder={
						initFormData.contact || `ไม่มี`
					}
					value={fieldContact}
					onChange={setFieldContact}
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
					startIcon:
						slotProps.submitButton.startIcon,
					label: slotProps.submitButton.label,
					onClick: handleSubmit,
				},
				cancelButton: {
					label: slotProps.cancelButton.label,
					onClick: slotProps.cancelButton.onClick,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
