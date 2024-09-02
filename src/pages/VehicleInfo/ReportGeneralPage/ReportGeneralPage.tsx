import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { ReportGeneralPageLoaderData } from "./loader";
import { postVehicleReportGeneral } from "$backend/database/post";
import { toast } from "react-toastify";

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
		postVehicleReportGeneral(formData).then(
			(reportId) => {
				toast.success("บันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/vehicle/report/general/info" +
							reportId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/vehicle/report/general",
					},
				);
			},
		);
	};

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
				onCancel={() =>
					submit(
						{},
						{
							action: "/vehicle/report/general",
						},
					)
				}
			/>
		</Stack>
	);
};
