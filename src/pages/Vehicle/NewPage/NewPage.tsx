import { postVehicle } from "$backend/database/post";
import { VehicleForm } from "$components/VehicleForm";
import { VehicleFormData } from "$types/models/Vehicle";
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
	const { initFormData, vendorOptions } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: VehicleFormData,
	) => {
		postVehicle(formData).then(
			(vehicleId) => {
				toast.success("ลงทะเบียนสำเร็จ");
				submit(
					{},
					{
						action: "/vehicles/info/" + vehicleId,
					},
				);
			},
			() => {
				toast.error("ลงทะเบียนล้มเหลว");
				submit(
					{},
					{
						action: "/vehicles",
					},
				);
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงทะเบียนรถรับส่ง
			</Typography>
			<VehicleForm
				vendorOptions={vendorOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() => {
					submit(
						{},
						{
							action: "/vehicles",
						},
					);
				}}
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
