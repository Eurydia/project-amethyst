import { postDriverReportGeneral } from "$backend/database/post";
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
import { ReportGeneralPageLoaderData } from "./loader";

export const ReportGeneralPage: FC = () => {
	const {
		driverId,
		topicOptions,
		initFormData,
		driverOptions,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
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
							"/drivers/report/general/info/" +
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
				ลงบันทึกเรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					driverSelect: {
						options: driverOptions,
					},
					topicComboBox: {
						options: topicOptions,
					},
					submitButton: {
						startIcon: <AddRounded />,
						label: "บันทึก",
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: () =>
							submit(
								{},
								{
									replace: true,
									action:
										"/drivers/info/" + driverId,
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
