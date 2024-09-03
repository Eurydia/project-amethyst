import { postVehicleReportInspection } from "$backend/database/post";
import { VehicleReportInspectionForm } from "$components/VehicleReportInspectionForm";
import { VehicleReportInspectionFormData } from "$types/models/Vehicle";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportInspectionPageLoaderData } from "./loader";

export const ReportInspectionPage: FC = () => {
	const {
		vehicleId,
		topicOptions,
		vehicleOptions,
		initFormData,
	} =
		useLoaderData() as ReportInspectionPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleReportInspectionFormData,
	) => {
		postVehicleReportInspection(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/vehicles/report/inspection/info" +
							reportId,
					},
				);
			},
			() => {
				toast.error("ลงบันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/vehicles/info" + vehicleId,
					},
				);
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกผลการตรวจสภาพรถ
			</Typography>
			<VehicleReportInspectionForm
				vehicleOptions={vehicleOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action:
								"/vehicle/report/inspection",
						},
					)
				}
				slotProps={{
					submitButton: {
						startIcon: <AddRounded />,
						label: "ลงบันทึก",
					},
				}}
			/>
		</Stack>
	);
};
