import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoEditPageLoaderData } from "./loader";
import { toast } from "react-toastify";
import { putDriverReportGeneral } from "$backend/database/put";

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
	) => {
		if (formData.driver === null) {
			return;
		}
		putDriverReportGeneral({
			id: reportId,
			content: formData.content,
			datetime: formData.datetime,
			driver_id: formData.driver.id,
			topics: formData.topics.join(","),
			title: formData.title,
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
							"/drivers/report/general/info/" +
							reportId,
					},
				),
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
				onSubmit={handleSubmit}
				onCancel={() => {
					submit(
						{},
						{
							action:
								"/drivers/report/general/info/" +
								reportId,
						},
					);
				}}
			/>
		</Stack>
	);
};
