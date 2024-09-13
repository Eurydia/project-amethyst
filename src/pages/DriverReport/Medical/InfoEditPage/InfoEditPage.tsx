import { putDriverReportMedical } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models/driver";
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
		driver,
		topicComboBoxOptions,
	} = useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const handleReturn = () => {
		submit(
			{},
			{
				replace: true,
				action:
					"/drivers/report/medical/info/" +
					reportId,
			},
		);
	};

	const handleSubmit = (
		formData: DriverReportFormData,
	) => {
		putDriverReportMedical(reportId, formData)
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(handleReturn);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขผลการตรวจสารเสพติด
			</Typography>
			<DriverReportForm
				initFormData={initFormData}
				slotProps={{
					driverSelect: {
						disabled: true,
						options: [driver],
					},
					topicComboBox: {
						options: topicComboBoxOptions,
					},
					submitButton: {
						startIcon: <SaveRounded />,
						label: "บันทึก",
						onClick: handleSubmit,
					},
					cancelButton: {
						label: "ยกเลิก",
						onClick: handleReturn,
					},
				}}
			/>
		</Stack>
	);
};
