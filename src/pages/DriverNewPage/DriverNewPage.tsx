import { postDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverRegisterForm";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverNewPageLoaderData } from "./loader";
import { DriverRegisterFormData } from "$types/FormData";

export const DriverNewPage: FC = () => {
	const { initFormData } =
		useLoaderData() as DriverNewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: DriverRegisterFormData,
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
			<DriverForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
