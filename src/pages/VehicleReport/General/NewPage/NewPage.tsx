import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		vehicleOptions,
		topicOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleReportGeneralFormData,
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

	const heading = "ลงบันทึกเรื่องร้องเรียนคนขับ";

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportGeneralForm
				vehicleOptions={vehicleOptions}
				initFormData={initFormData}
				topicOptions={topicOptions}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
