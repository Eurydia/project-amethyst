import { postDriverReportGeneral } from "$backend/database/post";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import {
	AddRounded,
	KeyboardArrowLeftRounded,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		selectedDriver,
		driverOptions,
		topicOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();

	const hasSelectedDriver =
		selectedDriver !== null;

	const previousPage = hasSelectedDriver
		? "/drivers/info/" + selectedDriver.id
		: "/drivers/report/general";

	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action: previousPage,
			},
		);
	};

	const handleSubmit = async (
		formData: DriverReportFormData,
	) => {
		postDriverReportGeneral(formData)
			.then((reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/drivers/report/general/info/" +
							reportId,
					},
				);
			})
			.catch(() => {
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			});
	};

	const secondaryHeading = hasSelectedDriver ? (
		<Typography fontWeight="bold">
			{`คนขับที่ถูกร้องเรียน: "${selectedDriver.name} ${selectedDriver.surname}"`}
		</Typography>
	) : null;

	const backButtonLabel = hasSelectedDriver
		? "กลับไปที่ข้อมูลคนขับ"
		: "กลับไปที่ตารางบันทึกเรื่องร้องเรียนคนขับ";

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to={previousPage}
			>
				<KeyboardArrowLeftRounded />
				{backButtonLabel}
			</Typography>
			<Typography variant="h1">
				{`ลงบันทึกเรื่องร้องเรียนคนขับ`}
			</Typography>
			{secondaryHeading}
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					driverSelect: {
						disabled: hasSelectedDriver,
						options: driverOptions,
					},
					topicComboBox: {
						options: topicOptions,
					},
					submitButton: {
						label: "เพิ่มเรื่องร้องเรียน",
						startIcon: <AddRounded />,
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleCancel,
					},
				}}
			/>
		</Stack>
	);
};
