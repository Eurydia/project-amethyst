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
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		vehicleSelectOptions,
		topicComboBoxOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();

	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action: "/vehicles/report/inspection",
			},
		);
	};

	const handleSubmit = async (
		formData: VehicleReportInspectionFormData,
	) => {
		postVehicleReportInspection(formData)
			.then((reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/vehicles/report/inspection/info" +
							reportId,
					},
				);
			})
			.catch(() => {
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			});
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกผลการตรวจสภาพรถ
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
