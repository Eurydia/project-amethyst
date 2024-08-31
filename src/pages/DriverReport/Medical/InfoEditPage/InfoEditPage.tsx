import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoEditPage: FC = () => {
	const {
		reportId,
		initFormData,
		driverOptions,
		topicOptions,
	} = useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		_: DriverReportFormData,
	) => {
		submit(
			{},
			{
				action:
					"/drivers/report/medical/info/" +
					reportId,
			},
		);
	};

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

	const heading = `ผลการตรวจสารเสพติด เลขที่ ${reportId} (แก้ไข)`;

	return (
		<Stack sx={{ gap: 1 }}>
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
