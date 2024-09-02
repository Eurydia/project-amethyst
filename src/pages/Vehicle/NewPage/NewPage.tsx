import { putVehicle } from "$backend/database/put";
import { VehicleForm } from "$components/VehicleForm";
import { VehicleFormData } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const { initFormData, vendorOptions } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleFormData,
	) => {
		putVehicle(formData)
			.then(() => {
				toast.success("บันทึกสำเร็จ");
				submit({}, { action: "/" });
			})
			.catch((error) => {
				console.error(error);
				toast.error("บันทึกล้มเหลว");
			});
	};

	const handleCancel = () => {
		submit({}, { action: "/" });
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงทะเบียนรถ
			</Typography>
			<VehicleForm
				vendorOptions={vendorOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
