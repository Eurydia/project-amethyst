import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { ReportGeneralPageLoaderData } from "./loader";

export const ReportGeneralPage: FC = () => {
	const {
		topicOptions,
		initFormData,
		vehicleOptions,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleReportGeneralFormData,
	) => {
		// postVhie(formData)
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

	const heading = `ลงบันทึกเรื่องร้องเรียนคนขับรถ`;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportGeneralForm
				vehicleOptions={vehicleOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
