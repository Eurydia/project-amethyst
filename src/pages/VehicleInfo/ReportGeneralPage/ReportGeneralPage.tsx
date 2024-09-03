import { postVehicleReportGeneral } from "$backend/database/post";
import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/Vehicle";
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
		topicOptions,
		initFormData,
		vehicleOptions,
		vehicleId,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: VehicleReportGeneralFormData,
	) => {
		postVehicleReportGeneral(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/vehicles/report/general/info" +
							reportId,
					},
				);
			},
			() => {
				toast.error("ลงบันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/vehicles/info/" + vehicleId,
					},
				);
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกเรื่องร้องเรียนรถรับส่ง
			</Typography>
			<VehicleReportGeneralForm
				vehicleOptions={vehicleOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action:
								"/vehicles/info/" + vehicleId,
						},
					)
				}
				slotProps={{
					submitButton: {
						label: "ลงบันทึก",
						startIcon: <AddRounded />,
					},
				}}
			/>
		</Stack>
	);
};
