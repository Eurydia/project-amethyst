import { DriverReportForm } from "$components/DriverReportForm";
import {
	DriverReportFormData,
	DriverReportModel,
} from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportGeneralPageLoaderData } from "./loader";
import { putDriverReportGeneral } from "$backend/database/put";

export const ReportGeneralPage: FC = () => {
	const {
		topicOptions,
		initFormData,
		driverOptions,
		reportId,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: DriverReportFormData,
	) => {
		if (!formData.driver) {
			return;
		}
		const model: DriverReportModel = {
			id: reportId,
			content: formData.content,
			driver_id: formData.driver.id,
			topics: formData.topics.join(","),
			datetime: formData.datetime,
			title: formData.title,
		};
		putDriverReportGeneral(model).then(
			() => {
				toast.error("บันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/drivers/report/general/info" +
							reportId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
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
					submit({}, { action: "/" })
				}
			/>
		</Stack>
	);
};
