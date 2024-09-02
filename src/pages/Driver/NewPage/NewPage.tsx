import { putDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverForm";
import {
	DriverFormData,
	DriverModel,
} from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const { initFormData, driverId } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: DriverFormData,
	) => {
		const model: DriverModel = {
			id: driverId,
			contact: formData.contact,
			license_type: formData.licenseType,
			name: formData.name,
			surname: formData.surname,
		};
		putDriver(model).then(
			() => {
				toast.error("บันทึกสำเร็จ");
				submit(
					{},
					{
						action: "/drivers/info" + driverId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
				submit({}, { action: "/drivers" });
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
			/>
		</Stack>
	);
};
