import { putDriverReportMedical } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { SaveRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
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
		formData: DriverReportFormData,
	) => {
		if (formData.driver === null) {
			return;
		}
		putDriverReportMedical({
			id: Number.parseInt(reportId),
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

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขผลการตรวจสารเสพติด
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
							action:
								"/drivers/report/medical/info/" +
								reportId,
						},
					)
				}
				slotProps={{
					submitButton: {
						startIcon: <SaveRounded />,
						label: "บันทึก",
					},
				}}
			/>
		</Stack>
	);
};
