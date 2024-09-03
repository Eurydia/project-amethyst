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
		topicOptions,
		vehicleOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: VehicleReportGeneralFormData,
	) => {
		if (formData.vehicle === null) {
			return;
		}

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
						action:
							"/vehicle/reports/general/info/" +
							reportId,
					},
				),
			);
	};

	const heading = ` แก้ไขเรื่องร้องเรียนรถรับส่ง`;

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
							action:
								"/vehicle/reports/general/info/" +
								reportId,
						},
					)
				}
				slotProps={{
					submitButton: {
						label: "บันทึก",
						startIcon: <SaveRounded />,
					},
				}}
			/>
		</Stack>
	);
};
