import { VehicleReportInspectionForm } from "$components/VehicleReportInspectionForm";
import { VehicleReportInspectionFormData } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { ReportInspectionPageLoaderData } from "./loader";

export const ReportInspectionPage: FC = () => {
	const {
		topicOptions,
		vehicleOptions,
		initFormData,
	} =
		useLoaderData() as ReportInspectionPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleReportInspectionFormData,
	) => {
		// postDriverReport(formData)
		// 	.then(() => {
		// 		toast.success("บันทึกสำเร็จ");
		// 		submit({}, { action: "/" });
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 		toast.error("บันทึกล้มเหลว");
		// 	});
	};

	const handleCancel = () =>
		submit({}, { action: "/" });

	const heading = `บันทึกผลการตรวจสภาพรถ (${initFormData.vehicle.license_plate})`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportInspectionForm
				vehicleOptions={vehicleOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
