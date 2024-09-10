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
		driverSelectOptions,
		topicComboBoxOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();

	const hasSelectedDriver =
		selectedDriver !== null;
	const action = hasSelectedDriver
		? `/drivers/info/` + selectedDriver.id
		: `/drivers/report/medical`;

	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action,
			},
		);
	};

	const handleSubmit = async (
		formData: DriverReportFormData,
	) => {
		postDriverReportGeneral(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/drivers/report/medical/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error(`ลงบันทึกล้มเหลว`);
				handleCancel();
			},
		);
	};

	const backButtonLabel = hasSelectedDriver
		? "ข้อมูลคนขับรถ"
		: "ตารางบันทึกเรื่องร้องเรียนคนขับรถ";

	const heading = hasSelectedDriver
		? `ลงบันทึกผลการตรวจสารเสพติดของ "${selectedDriver.name} ${selectedDriver.surname}"`
		: `ลงบันทึกผลการตรวจสารเสพติด`;

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to={action}
			>
				<KeyboardArrowLeftRounded />
				{backButtonLabel}
			</Typography>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					driverSelect: {
						disabled: hasSelectedDriver,
						options: driverSelectOptions,
					},
					topicComboBox: {
						options: topicComboBoxOptions,
					},
					submitButton: {
						startIcon: <AddRounded />,
						label: `เพิ่มผลตรวจ`,
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
