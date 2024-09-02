import { putDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { EditPageLoaderData } from "./loader";

export const EditPage: FC = () => {
	const { initFormData, driverId } =
		useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: DriverFormData,
	) => {
		const model = {
			id: driverId,
			contact: formData.contact,
			license_type: formData.licenseType,
			name: formData.name,
			surname: formData.surname,
		};
		putDriver(model)
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{ action: "/drivers/info/" + driverId },
				),
			);
	};

	const heading = `แก้ไขข้อมูลของ "${initFormData.name} ${initFormData.surname}"`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit({}, { action: "/" })
				}
			/>
		</Stack>
	);
};
