import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportGeneralPageLoaderData } from "./loader";
import { TRANSLATION } from "$locale/th";
import { postDriverReportGeneral } from "$backend/database/post";

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
				toast.success(
					TRANSLATION.postReportSuccess,
				);
				submit(
					{},
					{
						action:
							"/drivers/report/general/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error(TRANSLATION.postReportFail);
				submit(
					{},
					{
						action: "/drivers/info/" + driverId,
					},
				);
			},
		);
	};

	const heading = `ลงบันทึกเรื่องร้องเรียน "${
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
							action: "/drivers/info" + driverId,
						},
					)
				}
			/>
		</Stack>
	);
};
