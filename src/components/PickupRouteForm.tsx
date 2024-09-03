import { PickupRouteFormData } from "$types/models/PickupRoute";
import { TextField } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";

type PickupRouteFormProps = {
	initFormData: PickupRouteFormData;
	onSubmit: (
		formData: PickupRouteFormData,
	) => void;
	onCancel: () => void;
	slotProps: {
		submitButton: {
			label: string;
			startIcon: ReactNode;
		};
	};
};
export const PickupRouteForm: FC<
	PickupRouteFormProps
> = (props) => {
	const {
		initFormData: {
			arrivalTime,
			departureTime,
			name,
		},
		slotProps,
		onCancel,
		onSubmit,
	} = props;

	const [fieldName, setFieldName] =
		useState(name);
	const [fieldArrivalTime, setFieldArrivalTime] =
		useState(
			arrivalTime.length === 0
				? dayjs().startOf("day")
				: dayjs(arrivalTime, "HH:mm"),
		);
	const [
		fieldDepartureTime,
		setFieldDepartureTime,
	] = useState(
		dayjs(
			departureTime.length === 0
				? dayjs().startOf("day")
				: dayjs(departureTime, "HH:mm"),
		),
	);

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		onSubmit({
			name: fieldName.trim().normalize(),
			arrivalTime:
				fieldArrivalTime.format("HH:mm"),
			departureTime:
				fieldDepartureTime.format("HH:mm"),
		});
	};

	const missingFieldName =
		fieldName.trim().normalize() === "";
	const isFormIncomplete = missingFieldName;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อสายรถ",
			value: (
				<TextField
					fullWidth
					autoFocus
					error={missingFieldName}
					value={fieldName}
					placeholder={name}
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
					format="HH:mm น."
					formatDensity="spacious"
					value={fieldArrivalTime}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldArrivalTime(value);
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
					formatDensity="spacious"
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
					label: slotProps.submitButton.label,
					startIcon:
						slotProps.submitButton.startIcon,
					disabled: isFormIncomplete,
					onClick: handleSubmit,
				},
				cancelButton: {
					onClick: onCancel,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
