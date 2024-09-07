import { putDriverReportGeneral } from "$backend/database/put";
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
	) => {
		if (formData.driver === null) {
			return;
		}
		putDriverReportGeneral({
			id: Number.parseInt(reportId),
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

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขเรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "บันทึก",
						startIcon: <SaveRounded />,
						onClick: handleSubmit,
					},
					driverSelect: {
						options: driverOptions,
					},
					topicComboBox: {
						options: topicOptions,
					},
					cancelButton: {
						onClick: () =>
							submit(
								{},
								{
									action:
										"/drivers/report/general/info/" +
										reportId,
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
