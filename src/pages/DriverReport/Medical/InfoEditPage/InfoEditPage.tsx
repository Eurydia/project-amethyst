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
import { toast } from "react-toastify";
import { putDriverReportMedical } from "$backend/database/put";

export const InfoEditPage: FC = () => {
	const {
		reportId,
		initFormData,
		driverOptions,
		topicOptions,
	} = useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: DriverReportFormData,
	) => {
		if (formData.driver === null) {
			return;
		}
		putDriverReportMedical({
			id: reportId,
			content: formData.content,
			datetime: formData.datetime,
			driver_id: formData.driver.id,
			title: formData.title,
			topics: formData.topics.join(","),
		})
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{
						action:
							"/drivers/report/medical/info/" +
							reportId,
					},
				),
			);
	};

	const heading = `ผลการตรวจสารเสพติด (แก้ไข)`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverReportForm
				driverOptions={driverOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onCancel={() =>
					submit(
						{},
						{
							action:
								"/drivers/report/medical/info/" +
								reportId,
						},
					)
				}
				onSubmit={handleSubmit}
			/>
		</Stack>
	);
};
