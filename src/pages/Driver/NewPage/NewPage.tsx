import { postDriver } from "$backend/database/post";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/Driver";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const { initFormData } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action: "/drivers",
			},
		);
	};

	const handleSubmit = (
		formData: DriverFormData,
	) => {
		postDriver(formData).then(
			(driverId) => {
				toast.success("ลงทะเบียนสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action: "/drivers/info/" + driverId,
					},
				);
			},
			() => toast.error("ลงทะเบียนล้มเหลว"),
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงทะเบียนคนขับรถ
			</Typography>
			<DriverForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						startIcon: <AddRounded />,
						onClick: handleSubmit,
						label: "ลงทะเบียน",
					},
					cancelButton: {
						onClick: handleCancel,
					},
				}}
			/>
		</Stack>
	);
};
