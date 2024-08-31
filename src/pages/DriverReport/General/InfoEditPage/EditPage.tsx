import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/form-data";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoEditPageLoaderData } from "./loader";

export const InfoEditPage: FC = () => {
	const {
		reportId,
		initFormData,
		driverOptions,
		topicOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
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

	const heading = `บันทึกเรื่องร้องเรียนคนขับรถ เลขที่ ${reportId} (แก้ไข)`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
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
