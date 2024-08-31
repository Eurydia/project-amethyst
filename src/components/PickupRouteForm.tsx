import { SaveRounded } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { PickupRouteFormData } from "$types/models/PickupRoute";

type PickupRouteFormProps = {
	initFormData: PickupRouteFormData;
	onSubmit: (
		formData: PickupRouteFormData,
	) => void;
	onCancel: () => void;
};
export const PickupRouteForm: FC<
	PickupRouteFormProps
> = (props) => {
	const { initFormData, onCancel, onSubmit } =
		props;

	const [fieldName, setFieldName] = useState(
		initFormData.name,
	);
	const [fieldArrialTime, setFieldArrialTime] =
		useState(
			dayjs(initFormData.arrival_time, "HH:mm"),
		);
	const [
		fieldDepartureTime,
		setFieldDepartureTime,
	] = useState(
		dayjs(initFormData.departure_time, "HH:mm"),
	);

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		const formData: PickupRouteFormData = {
			arrival_time:
				fieldArrialTime.format("HH:mm"),
			departure_time:
				fieldDepartureTime.format("HH:mm"),
			name: fieldName.trim().normalize(),
		};
		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const missingFieldName =
		fieldName.trim().normalize() === "";

	const isFormIncomplete = missingFieldName;

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
					placeholder={initFormData.name}
					onChange={(e) =>
						setFieldName(e.target.value)
					}
				/>
			),
		},
		{
			label: "เวลานำเข้า",
			value: (
				<TimeField
					fullWidth
					required
					formatDensity="spacious"
					format="HH:mm น."
					value={fieldArrialTime}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldArrialTime(value);
					}}
				/>
			),
		},
		{
			label: "เวลานำออก",
			value: (
				<TimeField
					fullWidth
					format="HH:mm น."
					value={fieldDepartureTime}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldDepartureTime(value);
					}}
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
