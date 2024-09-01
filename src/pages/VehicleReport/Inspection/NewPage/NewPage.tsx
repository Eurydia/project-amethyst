import { postDriverReport } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		driverOptions,
		topicOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: DriverReportFormData,
	) => {
		const id = postDriverReport(formData)
			.then((id) => {
				toast.success("บันทึกสำเร็จ");
				submit({}, { action: "/" });
				return id;
			})
			.catch((error: string) => {
				toast.error(`บันทึกล้มเหลว: ${error}`);
				return null;
			});
		if (id === null) {
			return;
		}
		submit(
			{},
			{
				action:
					"/drivers/report/medical/info/" + id,
			},
		);
	};

	const handleCancel = () =>
		submit(
			{},
			{ action: "/drivers/report/medical" },
		);

	const heading = `ลงบันทึกผลการตรวจสารเสพติด`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverReportForm
				driverOptions={driverOptions}
				initFormData={initFormData}
				topicOptions={topicOptions}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
