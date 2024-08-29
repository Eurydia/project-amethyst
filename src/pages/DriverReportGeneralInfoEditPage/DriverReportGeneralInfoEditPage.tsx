import { DriverReportForm } from "$components/DriverReportForm";
import { TypographyAlert } from "$components/TypographyAlert";
import { DriverReportFormData } from "$types/form-data";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { DriverReportGeneralInfoPageLoaderData } from "./loader";

export const DriverReportGeneralInfoEditPage: FC =
	() => {
		const {
			initFormData,
			driverOptions,
			topicOptions,
			reportId,
		} =
			useLoaderData() as DriverReportGeneralInfoPageLoaderData;
		const submit = useSubmit();

		const handleSubmit = (
			formData: DriverReportFormData,
		) => {};

		const handleCancel = () => {
			submit(
				{},
				{
					action:
						"/drivers/report/general/info/" +
						reportId,
				},
			);
		};

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					แก้ไขข้อมูลการร้องเรียนคนขับรถ
				</Typography>
				<TypographyAlert severity="info">
					TBA
				</TypographyAlert>
				<DriverReportForm
					driverOptions={driverOptions}
					topicOptions={topicOptions}
					initFormData={initFormData}
					onCancel={handleCancel}
					onSubmit={handleSubmit}
				/>
			</Stack>
		);
	};
