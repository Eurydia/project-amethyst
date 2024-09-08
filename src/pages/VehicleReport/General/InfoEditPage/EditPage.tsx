import { putVehicleReportGeneral } from "$backend/database/put";
import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/Vehicle";
import { SaveRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
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
		topicComboBoxOptions,
		vehicleSelectOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
	const submit = useSubmit();
	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action:
					"/vehicles/report/general/info/" +
					reportId,
			},
		);
	};

	const handleSubmit = (
		formData: VehicleReportGeneralFormData,
	) => {
		putVehicleReportGeneral({
			id: reportId,
			content: formData.content,
			vehicle_id: formData.vehicle.id,
			datetime: formData.datetime,
			title: formData.title,
			topics: formData.topics.join(","),
		})
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{
						replace: true,
						action:
							"/vehicle/reports/general/info/" +
							reportId,
					},
				),
			);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขเรื่องร้องเรียนรถรับส่ง
			</Typography>
			<VehicleReportGeneralForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "บันทึก",
						startIcon: <SaveRounded />,
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
