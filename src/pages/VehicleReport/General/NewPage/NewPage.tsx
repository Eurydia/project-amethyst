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
		postVehicleReportGeneral(formData)
			.then((reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/vehicles/general/info" + reportId,
					},
				);
			})
			.catch(() => {
				toast.error("ลงบันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/vehicles/general",
					},
				);
			});
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกเรื่องร้องเรียนรถรับส่ง
			</Typography>
			<VehicleReportGeneralForm
				vehicleOptions={vehicleOptions}
				initFormData={initFormData}
				topicOptions={topicOptions}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit({}, { action: "/" })
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
