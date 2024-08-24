import { postDriver } from "$backend/database/put";
import { DriverRegisterForm } from "$components/DriverRegisterForm";
import { DriverFormData } from "$types/models";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverNewPageLoaderData } from "./loader";

export const DriverNewPage: FC = () => {
	const { initFormData, vehicles } =
		useLoaderData() as DriverNewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: DriverFormData,
	) => {
		postDriver(formData)
			.then(() => {
				toast.success("บันทึกสำเร็จ");
				submit({}, { action: "/" });
			})
			.catch((error) => {
				console.error(error);
				toast.error("บันทึกล้มเหลว");
			});
	};

	const handleCancel = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Stack spacing={1}>
				<Typography variant="h1">
					ลงทะเบียนคนขับรถ
				</Typography>
			</Stack>
			<DriverRegisterForm
				vehicles={vehicles}
				initVehicle={null}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
