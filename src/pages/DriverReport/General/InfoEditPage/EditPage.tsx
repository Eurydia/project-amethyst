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
		driver,
		topicComboBoxOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
	const submit = useSubmit();

	const handleReturn = () =>
		submit(
			{},
			{
				replace: true,
				action:
					"/drivers/report/general/info/" +
					reportId,
			},
		);
	const handleSubmit = (
		formData: DriverReportFormData,
	) => {
		putDriverReportGeneral(reportId, formData)
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(handleReturn);
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
						disabled: true,
						options: [driver],
					},
					topicComboBox: {
						options: topicComboBoxOptions,
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
