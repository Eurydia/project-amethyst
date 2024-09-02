import { DriverReportForm } from "$components/DriverReportForm";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportMedicalPageLoaderData } from "./loader";
import { DriverReportFormData } from "$types/models/Driver";
import { postDriverReportMedical } from "$backend/database/post";

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
				submit(
					{},
					{
						action:
							"/drivers/report/medical/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/drivers/info/" + driverId,
					},
				);
			},
		);
	};

	const heading = `ลงบันทึกผลการตรวจสารเสพติด "${
		initFormData.driver!.name
	} ${initFormData.driver!.surname}"`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverReportForm
				driverOptions={driverOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action: "/drivers/info/" + driverId,
						},
					)
				}
			/>
		</Stack>
	);
};
