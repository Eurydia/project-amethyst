import { putDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/driver";
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
	const { initFormData, driver } =
		useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const action = `/drivers/info/${driver.id}`;
	const handleReturn = () =>
		submit(
			{},
			{
				replace: true,
				action,
			},
		);
	const handleSubmit = (
		formData: DriverFormData,
	) => {
		putDriver(driver.id, formData)
			.then(
				() => toast.success("แก้ไขข้อมูลสำเร็จ"),
				() => toast.error("แก้ไขข้อมูลล้มเหลว"),
			)
			.finally(handleReturn);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{`${driver.name} ${driver.surname}`}
			</Typography>
			<Typography variant="h2">
				{`แบบฟอร์มแก้ไขข้อมูลคนขับรถ`}
			</Typography>
			<DriverForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						startIcon: <SaveRounded />,
						label: "ยืนยันการแก้ไข",
						onClick: handleSubmit,
					},
					cancelButton: {
						label: "ยกเลิก",
						onClick: handleReturn,
					},
				}}
			/>
		</Stack>
	);
};
