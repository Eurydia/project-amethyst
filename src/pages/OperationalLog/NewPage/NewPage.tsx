import { postOperationalLog } from "$backend/database/post";
import { OperationalLogForm } from "$components/OperationalLogForm";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		selectedDriver,
		selectedRoute,
		selectedVehicle,
		initFormData,
		driverSelectOptions,
		vehicleSelectOptions,
		routeSelectOptions,
	} = useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const hasSelectedDriver =
		selectedDriver !== null;
	const hasSelectedVehicle =
		selectedVehicle !== null;
	const hasSelectedRoute = selectedRoute !== null;

	const handleReturn = () => {
		submit({}, { replace: true, action });
	};

	const handleSubmit = (
		formData: OperationalLogFormData,
	) => {
		postOperationalLog(formData)
			.then(
				() => toast.success("ลงบันทึกสำเร็จ"),
				() => toast.error("ลงบันทึกล้มเหลว"),
			)
			.finally(handleReturn);
	};

	let heading = "ลงบันทึกประวัติการเดินรถ";
	let backButtonLabel =
		"ตารางบันทึกประวัติการเดินรถ";
	let action = `/operational-logs`;
	if (hasSelectedDriver) {
		heading += `ของคนขับรถ "${selectedDriver.name} ${selectedDriver.surname}"`;
		action = `/drivers/info/` + selectedDriver.id;
		backButtonLabel = "ข้อมูลคนขับรถ";
	} else if (hasSelectedVehicle) {
		heading += `ของรถรับส่ง "${selectedVehicle.license_plate}"`;
		action =
			`/vehicles/info/` + selectedVehicle.id;
		backButtonLabel = "ข้อมูลรถรับส่ง";
	} else if (hasSelectedRoute) {
		heading += `ของสายรถ "${selectedRoute.name}"`;
		action =
			`/pickup-routes/info/` + selectedRoute.id;
		backButtonLabel = "ข้อมูลสายรถ";
	}

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to={action}
			>
				<KeyboardArrowLeftRounded />
				{backButtonLabel}
			</Typography>
			<Typography variant="h1">
				{heading}
			</Typography>
			<OperationalLogForm
				initFormData={initFormData}
				slotProps={{
					driverSelect: {
						disabled: hasSelectedDriver,
						options: driverSelectOptions,
					},
					vehicleSelect: {
						disabled: hasSelectedVehicle,
						options: vehicleSelectOptions,
					},
					routeSelect: {
						disabled: hasSelectedRoute,
						options: routeSelectOptions,
					},
					submitButton: {
						onClick: handleSubmit,
					},
					cancelButton: { onClick: handleReturn },
				}}
			/>
		</Stack>
	);
};
