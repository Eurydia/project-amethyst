import { PickupRouteFormData } from "$types/models/PickupRoute";
import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { BaseInputTextField } from "./BaseInputTextField";

type PickupRouteFormProps = {
	initFormData: PickupRouteFormData;

	slotProps: {
		submitButton: {
			onClick: (
				formData: PickupRouteFormData,
			) => void;
			label: string;
			startIcon: ReactNode;
		};
		cancelButton: {
			onClick: () => void;
		};
	};
};
export const PickupRouteForm: FC<
	PickupRouteFormProps
> = (props) => {
	const { initFormData, slotProps } = props;

	const [fieldName, setFieldName] = useState(
		initFormData.name,
	);
	const [fieldArrivalTime, setFieldArrivalTime] =
		useState(
			dayjs(initFormData.arrivalTime, "HH:mm"),
		);
	const [
		fieldDepartureTime,
		setFieldDepartureTime,
	] = useState(
		dayjs(initFormData.departureTime, "HH:mm"),
	);

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		slotProps.submitButton.onClick({
			name: fieldName.trim().normalize(),
			arrivalTime:
				fieldArrivalTime.format("HH:mm"),
			departureTime:
				fieldDepartureTime.format("HH:mm"),
		});
	};

	const isFieldArrivalTimeIncomplete =
		Number.isNaN(fieldArrivalTime.hour()) ||
		Number.isNaN(fieldArrivalTime.minute());
	const isFieldDepartureTimeIncomplete =
		Number.isNaN(fieldDepartureTime.hour()) ||
		Number.isNaN(fieldDepartureTime.minute());
	const isMissingName =
		fieldName.trim().normalize() === "";
	const isFormIncomplete =
		isMissingName ||
		isFieldArrivalTimeIncomplete ||
		isFieldDepartureTimeIncomplete;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อสาย",
			value: (
				<BaseInputTextField
					shouldAutoFocus
					isError={isMissingName}
					value={fieldName}
					placeholder={initFormData.name}
					onChange={setFieldName}
				/>
			),
		},
		{
			label: "เวลารับเข้า",
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
			label: "เวลารับออก",
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
					onClick: slotProps.cancelButton.onClick,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
