/** @format */

import { tauriPutDriverReportGeneral } from "$backend/database/put";
import { DriverReportInfoGroup } from "$components/DriverReportInfoGroup";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { DriverReportMedicalInfoPageLoaderData } from "./loader";

export const DriverReportMedicalInfoPage: FC = () => {
	const { report, driver, topicComboBoxOptions } =
		useLoaderData() as DriverReportMedicalInfoPageLoaderData;
	const { revalidate } = useRevalidator();
	return (
		<Stack spacing={1}>
			<Typography variant="h1">{`${driver.name} ${driver.surname}`}</Typography>
			<Typography variant="h2">รายละเอียดผลการตรวจสารเสพติด</Typography>
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
										toast.success("เพิ่มผลตรวจสำเร็จ");
										revalidate();
									},
									() => toast.error("เพิ่มผลตรวจล้มเหลว")
								),
						},
					},
				}}
			/>
		</Stack>
	);
};
