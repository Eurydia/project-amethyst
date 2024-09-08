import { putDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/Driver";
import { SaveRounded } from "@mui/icons-material";
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

	const handleReturn = () =>
		submit(
			{},
			{
				replace: true,
				action: "/drivers/info/" + driverId,
			},
		);
	const handleSubmit = (
		formData: DriverFormData,
	) => {
		putDriver(driverId, formData)
			.then(
				() => toast.success("แก้ไขข้อมูลสำเร็จ"),
				() => toast.error("แก้ไขข้อมูลล้มเหลว"),
			)
			.finally(handleReturn);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขข้อมูลคนขับรถ
			</Typography>
			<DriverForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						startIcon: <SaveRounded />,
						label: "บันทึก",
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleReturn,
					},
				}}
			/>
		</Stack>
	);
};
