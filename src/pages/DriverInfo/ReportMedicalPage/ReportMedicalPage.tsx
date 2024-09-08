import { postDriverReportMedical } from "$backend/database/post";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportMedicalPageLoaderData } from "./loader";

export const ReportMedicalPage: FC = () => {
	const { topicOptions, driver, initFormData } =
		useLoaderData() as ReportMedicalPageLoaderData;

	const submit = useSubmit();

	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action: "/drivers/info/" + driver.id,
			},
		);
	};
	const handleSubmit = async (
		formData: DriverReportFormData,
	) => {
		postDriverReportMedical(formData).then(
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
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{`ลงบันทึกผลการตรวจสารเสพติดของ "${driver.name} ${driver.surname}"`}
			</Typography>
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "ลงบันทึก",
						startIcon: <AddRounded />,
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleCancel,
					},
					driverSelect: {
						options: [driver],
						disabled: true,
					},
					topicComboBox: {
						options: topicOptions,
					},
				}}
			/>
		</Stack>
	);
};
