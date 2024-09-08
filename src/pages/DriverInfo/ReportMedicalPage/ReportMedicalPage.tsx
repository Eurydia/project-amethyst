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
	const {
		driverId,
		topicOptions,
		driverOptions,
		initFormData,
	} =
		useLoaderData() as ReportMedicalPageLoaderData;

	const submit = useSubmit();

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
				submit(
					{},
					{
						replace: true,
						action: "/drivers/info/" + driverId,
					},
				);
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกผลการตรวจสารเสพติด
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
						onClick: () =>
							submit(
								{},
								{
									action:
										"/drivers/info/" + driverId,
								},
							),
					},
					driverSelect: {
						options: driverOptions,
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
