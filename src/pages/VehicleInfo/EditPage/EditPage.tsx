import { putVehicle } from "$backend/database/put";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { EditPageLoaderData } from "./loader";
import { VehicleForm } from "$components/VehicleForm";
import { VehicleFormData } from "$types/models/Vehicle";

export const EditPage: FC = () => {
	const {
		initFormData,
		vehicleId,
		vendorOptions,
	} = useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleFormData,
	) => {
		putVehicle({
			id: vehicleId,
			license_plate: formData.licensePlate,
			registered_city: formData.registeredCity,
			vendor: formData.vendor,
			vehicle_class: formData.vehicleClass,
		})
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{
						action: "/vehicles/info/" + vehicleId,
					},
				),
			);
	};
	const heading = `ข้อมูลคนขับรถ  (แก้ไข)`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleForm
				vendorOptions={vendorOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action:
								"/vehicles/info/" + vehicleId,
						},
					)
				}
			/>
		</Stack>
	);
};
