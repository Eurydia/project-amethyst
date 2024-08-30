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
import { DriverReportMedicalInfoPageLoaderData } from "./loader";

export const DriverReportMedicalInfoEditPage: FC =
	() => {
		const {
			initFormData,
			driverOptions,
			topicOptions,
			reportId,
		} =
			useLoaderData() as DriverReportMedicalInfoPageLoaderData;
		const submit = useSubmit();

		const handleSubmit = (
			formData: DriverReportFormData,
		) => {};

		const handleCancel = () => {
			submit(
				{},
				{
					action:
						"/drivers/report/medical/info/" +
						reportId,
				},
			);
		};

		return (
			<Stack spacing={1}>
				<Typography variant="h1">
					แก้ไขข้อมูลการรายงานสุขภาพ
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
