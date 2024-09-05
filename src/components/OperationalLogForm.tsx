import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { AddRounded } from "@mui/icons-material";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { DriverInputSelect } from "./DriverInputSelect";
import { PickupRouteInputSelect } from "./PickupRouteInputSelect";
import { VehicleInputSelect } from "./VehicleInputSelect";

type OperationalLogFormProps = {
	lockDriver?: boolean;
	lockRoute?: boolean;
	lockVehicle?: boolean;
	initFormData: OperationalLogFormData;
	onSubmit: (
		formData: OperationalLogFormData,
	) => void;
	onCancel: () => void;
};
export const OperationalLogForm: FC<
	OperationalLogFormProps
> = (props) => {
	const {
		lockDriver,
		lockRoute,
		lockVehicle,
		initFormData,
		onCancel,
		onSubmit,
	} = props;

	const [fieldStartDate, setFieldStartDate] =
		useState(dayjs(initFormData.startDate));
	const [fieldEndDate, setFieldEndDate] =
		useState(dayjs(initFormData.endDate));
	const [fieldDriver, setFieldDriver] = useState(
		initFormData.driver,
	);
	const [fieldRoute, setFieldRoute] = useState(
		initFormData.route,
	);
	const [fieldVehicle, setFieldVehicle] =
		useState(initFormData.vehicle);

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		onSubmit({
			driver: fieldDriver,
			route: fieldRoute,
			vehicle: fieldVehicle,
			startDate: fieldStartDate.format(),
			endDate: fieldEndDate.format(),
		});
	};

	const isFieldStartDateInvalidValid =
		fieldStartDate === null ||
		Number.isNaN(fieldStartDate.date()) ||
		Number.isNaN(fieldStartDate.month()) ||
		Number.isNaN(fieldStartDate.year());
	const isFieldEndDateInvalidValid =
		fieldEndDate === null ||
		Number.isNaN(fieldEndDate.date()) ||
		Number.isNaN(fieldEndDate.month()) ||
		Number.isNaN(fieldEndDate.year());
	const isDriverMissing = fieldDriver === null;
	const isRouteMissing = fieldRoute === null;
	const isVehicleMissing = fieldVehicle === null;
	const isFormIncomplete =
		isDriverMissing ||
		isRouteMissing ||
		isVehicleMissing ||
		isFieldStartDateInvalidValid ||
		isFieldEndDateInvalidValid ||
		fieldEndDate.isBefore(fieldStartDate);

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "วันที่เริ่มมีผล",
			value: (
				<DateField
					fullWidth
					format="DD/MM/YYYY"
					formatDensity="spacious"
					value={fieldStartDate}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldStartDate(value);
					}}
				/>
			),
		},
		{
			label: "วันที่สิ้นสุด",
			value: (
				<DateField
					fullWidth
					format="DD/MM/YYYY"
					formatDensity="spacious"
					value={fieldEndDate}
					onChange={(value) => {
						if (value === null) {
							return;
						}
						setFieldEndDate(value);
					}}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<DriverInputSelect
					isDisabled={lockDriver}
					value={fieldDriver}
					onChange={setFieldDriver}
				/>
			),
		},
		{
			label: "รถรับส่ง",
			value: (
				<VehicleInputSelect
					isDisabled={lockVehicle}
					onChange={setFieldVehicle}
					value={fieldVehicle}
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<PickupRouteInputSelect
					onChange={setFieldRoute}
					value={fieldRoute}
					isDisabled={lockRoute}
				/>
			),
		},
	];

	return (
		<BaseForm
			slotProps={{
				submitButton: {
					label: "ลงบันทึก",
					startIcon: <AddRounded />,
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
