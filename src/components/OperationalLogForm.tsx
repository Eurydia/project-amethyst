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
	onSubmit: (
		formData: OperationalLogFormData,
	) => void;
	onCancel: () => void;
	vehicleOptions: VehicleModel[];
	driverOptions: DriverModel[];
	routeOptions: PickupRouteModel[];
};
export const OperationalLogForm: FC<
	OperationalLogFormProps
> = (props) => {
	const {
		driverOptions,
		routeOptions,
		vehicleOptions,
		initFormData,
		onCancel,
		onSubmit,
	} = props;

	const [fieldStartDate, setFieldStartDate] =
		useState(
			initFormData.startDate === null
				? null
				: dayjs(initFormData.startDate),
		);
	const [fieldEndDate, setFieldEndDate] =
		useState(
			initFormData.endDate === null
				? null
				: dayjs(initFormData.endDate),
		);
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
			startDate:
				fieldStartDate === null
					? null
					: fieldStartDate.format(),
			endDate:
				fieldEndDate === null
					? null
					: fieldEndDate.format(),
		});
	};

	const shouldLockDriver =
		initFormData.driver !== null;
	const shouldLockRoute =
		initFormData.route !== null;
	const shouldLockVehicle =
		initFormData.vehicle !== null;

	const isDriverMissing = fieldDriver === null;
	const isRouteMissing = fieldRoute === null;
	const isVehicleMissing = fieldVehicle === null;
	const isFormIncomplete =
		isDriverMissing ||
		isRouteMissing ||
		isVehicleMissing;

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
					onChange={setFieldStartDate}
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
					onChange={setFieldEndDate}
				/>
			),
		},
		{
			label: "คนขับรถ",
			value: (
				<DriverInputSelect
					options={driverOptions}
					value={fieldDriver}
					isDisabled={shouldLockDriver}
					onChange={setFieldDriver}
				/>
			),
		},
		{
			label: "รถรับส่ง",
			value: (
				<VehicleInputSelect
					options={vehicleOptions}
					isDisabled={shouldLockRoute}
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
					options={routeOptions}
					value={fieldRoute}
					isDisabled={shouldLockVehicle}
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
					label: "ลงบันทึก",
					startIcon: <AddRounded />,
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
