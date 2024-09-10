import { putDriver } from "$backend/database/put";
import { DriverForm } from "$components/DriverForm";
import { DriverFormData } from "$types/models/Driver";
import {
	KeyboardArrowLeftRounded,
	SaveRounded,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
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

	const headingMain = "แก้ไขข้อมูลคนขับรถ";
	const headingSub = `"${driver.name} ${driver.surname}"`;

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to={action}
			>
				<KeyboardArrowLeftRounded />
				ข้อมูลคนขับรถ
			</Typography>
			<Typography variant="h1">
				{headingMain}
			</Typography>
			<Typography variant="h2">
				{headingSub}
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
						label: "ยกเลิก",
						onClick: handleReturn,
					},
				}}
			/>
		</Stack>
	);
};
