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
import { postVehicle } from "$backend/database/post";

export const NewPage: FC = () => {
	const { initFormData, vendorOptions } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleFormData,
	) => {
		postVehicle(formData).then(
			(vehicleId) => {
				toast.success("บันทึกสำเร็จ");
				submit(
					{},
					{
						action: "/vehicles/info/" + vehicleId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
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
				ลงทะเบียนรถ
			</Typography>
			<VehicleForm
				vendorOptions={vendorOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() => {
					toast.error("บันทึกล้มเหลว");
					submit(
						{},
						{
							action: "/vehicles",
						},
					);
				}}
			/>
		</Stack>
	);
};
