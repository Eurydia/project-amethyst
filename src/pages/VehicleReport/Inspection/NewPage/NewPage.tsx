import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";
import { postVehicleReportInspection } from "$backend/database/post";
import { VehicleReportInspectionFormData } from "$types/models/Vehicle";
import { VehicleReportInspectionForm } from "$components/VehicleReportInspectionForm";

export const NewPage: FC = () => {
	const {
		vehicleOptions,
		topicOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleReportInspectionFormData,
	) => {
		postVehicleReportInspection(formData)
			.then((reportId) => {
				toast.success("บันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/vehicles/report/inspection/info" +
							reportId,
					},
				);
			})
			.catch(() => {
				toast.error("บันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/vehicles/report/inspection",
					},
				);
			});
	};

	const heading = `ลงบันทึกผลการตรวจรถ`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportInspectionForm
				vehicleOptions={vehicleOptions}
				initFormData={initFormData}
				topicOptions={topicOptions}
				onSubmit={handleSubmit}
				onCancel={() => {
					submit(
						{},
						{
							action:
								"/vehicles/report/inspection",
						},
					);
				}}
			/>
		</Stack>
	);
};
