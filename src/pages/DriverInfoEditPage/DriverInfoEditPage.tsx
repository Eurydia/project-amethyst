import { postDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverRegisterForm";
import { DriverFormData } from "$types/form-data";
import {
	Container,
	Stack,
	Typography,
} from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverInfoEditPageLoaderData } from "./loader";

export const DriverInfoEditPage: FC = () => {
	const { initFormData } =
		useLoaderData() as DriverInfoEditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: DriverFormData,
	) => {
		postDriver(formData)
			.then(() => {
				toast.success("แก้ไขสำเร็จ");
				submit({}, { action: "/" });
			})
			.catch((error) => {
				console.error(error);
				toast.error("แก้ไขล้มเหลว");
			});
	};
	const handleCancel = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				แก้ไขข้อมูลคนขับรถ
			</Typography>
			<DriverForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
