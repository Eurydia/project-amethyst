import { postDriverReportGeneral } from "$backend/database/post";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/Driver";
import { AddRounded } from "@mui/icons-material";
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
		postDriverReportGeneral(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/drivers/report/medical/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error(`ลงบันทึกล้มเหลว`);
				submit(
					{},
					{ action: "/drivers/report/medical" },
				);
			},
		);
	};

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
				onCancel={() =>
					submit(
						{},
						{ action: "/drivers/report/medical" },
					)
				}
				slotProps={{
					submitButton: {
						startIcon: <AddRounded />,
						label: `ลงบันทึก`,
					},
				}}
			/>
		</Stack>
	);
};
