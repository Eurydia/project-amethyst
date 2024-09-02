import { VehicleReportGeneralForm } from "$components/VehicleReportGeneralForm";
import { VehicleReportGeneralFormData } from "$types/models/Vehicle";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { NewPageLoaderData } from "./loader";
import { postVehicleReportGeneral } from "$backend/database/post";
import { toast } from "react-toastify";

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
		postVehicleReportGeneral(formData)
			.then((reportId) => {
				toast.success("บันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/vehicles/general/info" + reportId,
					},
				);
			})
			.catch(() => {
				toast.error("บันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/vehicles/general",
					},
				);
			});
	};

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
				onCancel={() =>
					submit({}, { action: "/" })
				}
			/>
		</Stack>
	);
};
