import { postVehicleReportInspection } from "$backend/database/post";
import { VehicleReportInspectionForm } from "$components/VehicleReportInspectionForm";
import { VehicleReportInspectionFormData } from "$types/models/vehicle";
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
		topicComboBoxOptions,
		vehicleSelectOptions,
		initFormData,
	} =
		useLoaderData() as ReportInspectionPageLoaderData;

	const submit = useSubmit();

	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action:
					"/vehicles/info/" +
					initFormData.vehicle.id,
			},
		);
	};

	const handleSubmit = async (
		formData: VehicleReportInspectionFormData,
	) => {
		postVehicleReportInspection(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/vehicles/report/inspection/info/" +
							reportId,
					},
				);
			},
			(err) => {
				console.error(err);
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{`ลงบันทึกผลการตรวจสภาพรถ (${initFormData.vehicle.license_plate})`}
			</Typography>
			<VehicleReportInspectionForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						startIcon: <AddRounded />,
						label: "ลงบันทึก",
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleCancel,
					},
					vehicleSelect: {
						options: vehicleSelectOptions,
						disabled: true,
					},
					topicComboBox: {
						options: topicComboBoxOptions,
					},
				}}
			/>
		</Stack>
	);
};
