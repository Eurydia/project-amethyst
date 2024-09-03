import { VehicleFormData } from "$types/models/Vehicle";
import { SaveRounded } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { VehicleCitySelect } from "./VehicleCitySelect";
import { VehicleClassRadioGroup } from "./VehicleClassRadioGroup";
import { VehicleInputVendorAutocomplete } from "./VehicleInputVendorAutocomplete";

type VehicleFormProps = {
	vendorOptions: string[];
	initFormData: VehicleFormData;
	onSubmit: (formData: VehicleFormData) => void;
	onCancel: () => void;
};
export const VehicleForm: FC<VehicleFormProps> = (
	props,
) => {
	const {
		initFormData,
		onCancel,
		onSubmit,
		vendorOptions,
	} = props;

	const [
		fieldLicensePlate,
		setFieldLicensePlate,
	] = useState(initFormData.licensePlate);
	const [fieldVendor, setFieldVendor] = useState(
		initFormData.vendor,
	);
	const [
		fieldRegisteredCity,
		setFieldRegisteredCity,
	] = useState(initFormData.registeredCity);
	const [
		fieldVehicleClass,
		setFieldVehicleClass,
	] = useState(initFormData.vehicleClass);

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		const formData: VehicleFormData = {
			licensePlate: fieldLicensePlate
				.normalize()
				.trim(),
			vendor: fieldVendor,
			registeredCity: fieldRegisteredCity,
			vehicleClass: fieldVehicleClass,
		};
		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const missingFieldLicensePlate =
		fieldLicensePlate.trim().normalize() === "";
	const missingFieldRegisteredCity =
		fieldRegisteredCity.trim().normalize() === "";
	const missingFieldVendor =
		fieldVendor.trim().normalize() === "";

	const isFormIncomplete =
		missingFieldLicensePlate ||
		missingFieldRegisteredCity ||
		missingFieldVendor;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "เลขทะเบียน",
			value: (
				<TextField
					fullWidth
					autoFocus
					error={missingFieldLicensePlate}
					value={fieldLicensePlate}
					placeholder={initFormData.licensePlate}
					onChange={(e) =>
						setFieldLicensePlate(e.target.value)
					}
				/>
			),
		},
		{
			label: "ประเภทรถ",
			value: (
				<VehicleClassRadioGroup
					value={fieldVehicleClass}
					onChange={setFieldVehicleClass}
				/>
			),
		},
		{
			label: "จังหวัดที่จดทะเบียน",
			value: (
				<VehicleCitySelect
					value={fieldRegisteredCity}
					onChange={setFieldRegisteredCity}
				/>
			),
		},
		{
			label: "หจก.",
			value: (
				<VehicleInputVendorAutocomplete
					options={vendorOptions}
					value={fieldVendor}
					onChange={setFieldVendor}
				/>
			),
		},
	];

	return (
		<BaseForm
			slotProps={{
				submitButton: {
					disabled: isFormIncomplete,
					startIcon: <SaveRounded />,
					variant: "contained",
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
