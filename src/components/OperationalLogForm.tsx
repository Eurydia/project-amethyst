import { DriverModel } from "$types/models/Driver";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { PickupRouteModel } from "$types/models/PickupRoute";
import { VehicleModel } from "$types/models/Vehicle";
import { AddRounded } from "@mui/icons-material";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import { BaseForm } from "./BaseForm";
import { DriverInputSelect } from "./DriverInputSelect";
import { PickupRouteInputSelect } from "./PickupRouteInputSelect";
import { VehicleInputSelect } from "./VehicleInputSelect";

type OperationalLogFormProps = {
	initFormData: OperationalLogFormData;
	slotProps: {
		submitButton: {
			onClick: (
				formData: OperationalLogFormData,
			) => void;
		};
		cancelButton: {
			onClick: () => void;
		};
		routeSelect: {
			disabled?: boolean;
			options: PickupRouteModel[];
		};
		driverSelect: {
			disabled?: boolean;
			options: DriverModel[];
		};
		vehicleSelect: {
			disabled?: boolean;
			options: VehicleModel[];
		};
	};
};
export const OperationalLogForm: FC<
	OperationalLogFormProps
> = (props) => {
	const { initFormData, slotProps } = props;

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
		slotProps.submitButton.onClick({
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
					isDisabled={
						slotProps.driverSelect.disabled
					}
					options={slotProps.driverSelect.options}
					value={fieldDriver}
					onChange={setFieldDriver}
				/>
			),
		},
		{
			label: "รถรับส่ง",
			value: (
				<VehicleInputSelect
					disabled={
						slotProps.vehicleSelect.disabled
					}
					options={
						slotProps.vehicleSelect.options
					}
					value={fieldVehicle}
					onChange={setFieldVehicle}
				/>
			),
		},
		{
			label: "สายรถ",
			value: (
				<PickupRouteInputSelect
					isDisabled={
						slotProps.routeSelect.disabled
					}
					options={slotProps.routeSelect.options}
					value={fieldRoute}
					onChange={setFieldRoute}
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
					onClick: slotProps.cancelButton.onClick,
				},
			}}
		>
			{formItems}
		</BaseForm>
	);
};
