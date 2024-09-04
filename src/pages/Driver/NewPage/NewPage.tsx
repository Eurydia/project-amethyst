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

	const handleSubmit = (
		formData: DriverFormData,
	) => {
		postDriver(formData).then(
			(driverId) => {
				toast.success("ลงทะเบียนสำเร็จ");
				submit(
					{},
					{
						action: "/drivers/info/" + driverId,
					},
				);
			},
			() => {
				toast.error("ลงทะเบียนล้มเหลว");
				submit(
					{},
					{
						action: "/drivers",
					},
				);
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงทะเบียนคนขับรถ
			</Typography>
			<DriverForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit({}, { action: "/drivers" })
				}
				slotProps={{
					submitButton: {
						startIcon: <AddRounded />,
						label: "ลงทะเบียน",
					},
				}}
			/>
		</Stack>
	);
};
