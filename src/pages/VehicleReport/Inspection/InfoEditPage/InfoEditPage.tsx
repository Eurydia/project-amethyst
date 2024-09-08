import { putVehicleReportInspection } from "$backend/database/put";
import { VehicleReportInspectionForm } from "$components/VehicleReportInspectionForm";
import { VehicleReportInspectionFormData } from "$types/models/Vehicle";
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
		topicComboBoxOptions,
		vehicleSelectOptions,
	} = useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const handleReturn = () => {
		submit(
			{},
			{
				replace: true,
				action:
					"/vehicles/report/inspection/info/" +
					reportId,
			},
		);
	};
	const handleSubmit = (
		formData: VehicleReportInspectionFormData,
	) => {
		putVehicleReportInspection(reportId, formData)
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(handleReturn);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขผลการตรวจสภาพรถ{" "}
			</Typography>
			<VehicleReportInspectionForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "บันทึก",
						startIcon: <SaveRounded />,
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleReturn,
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
