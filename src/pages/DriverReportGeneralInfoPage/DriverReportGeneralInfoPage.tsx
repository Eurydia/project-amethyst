/** @format */

import { tauriPutDriverReportGeneral } from "$backend/database/put";
import { DriverReportInfoGroup } from "$components/DriverReportInfoGroup";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { DriverReportGeneralInfoPageLoaderData } from "./loader";

export const DriverReportGeneralInfoPage: FC = () => {
	const { report, driver, topicComboBoxOptions } =
		useLoaderData() as DriverReportGeneralInfoPageLoaderData;
	const { revalidate } = useRevalidator();
	return (
		<Stack spacing={1}>
			<Typography variant="h1">{`${driver.name} ${driver.surname}`}</Typography>
			<Typography variant="h2">รายละเอียดเรื่องร้องเรียนคนขับรถ</Typography>
			<DriverReportInfoGroup
				report={report}
				driver={driver}
				slotProps={{
					form: {
						topicComboBox: {
							options: topicComboBoxOptions,
						},
						submitButton: {
							onClick: async (formData) =>
								tauriPutDriverReportGeneral(report.id, formData).then(
									() => {
										toast.success("เพิ่มเรื่องร้องเรียนสำเร็จ");
										revalidate();
									},
									() => toast.error("เพิ่มเรื่องร้องเรียนล้มเหลว")
								),
						},
					},
				}}
			/>
		</Stack>
	);
};
