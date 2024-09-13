import { postVehicleReportGeneral } from "$backend/database/post";
import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/vehicle";
import { AddRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportGeneralPageLoaderData } from "./loader";

export const ReportGeneralPage: FC = () => {
	const {
		initFormData,
		topicComboBoxOptions,
		vehicleSelectOptions,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;

	const submit = useSubmit();

	const handleCancel = () =>
		submit(
			{},
			{
				replace: true,
				action:
					"/vehicles/info/" +
					initFormData.vehicle.id,
			},
		);

	const handleSubmit = async (
		formData: VehicleReportGeneralFormData,
	) => {
		postVehicleReportGeneral(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/vehicles/report/general/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{`ลงบันทึกเรื่องร้องเรียนรถรับส่ง (${initFormData.vehicle.license_plate})`}
			</Typography>
			<VehicleReportGeneralForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "ลงบันทึก",
						startIcon: <AddRounded />,
						onClick: handleSubmit,
					},
					topicComboBox: {
						options: topicComboBoxOptions,
					},
					vehcleSelect: {
						disabled: true,
						options: vehicleSelectOptions,
					},
					cancelButton: {
						onClick: handleCancel,
					},
				}}
			/>
		</Stack>
	);
};
