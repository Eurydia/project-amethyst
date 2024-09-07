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

	const handleSubmit = (
		formData: VehicleReportInspectionFormData,
	) => {
		putVehicleReportInspection({
			content: formData.content,
			datetime: formData.datetime,
			frame: formData.frame,
			seatbelts: formData.seatbelts,
			seats: formData.seats,
			tires: formData.tires,
			windows: formData.windows,
			overhead_fan: formData.overheadFan,
			turn_signals: formData.turnSignals,
			brake_light: formData.brakeLights,
			headlights: formData.headlights,
			rearview_mirror: formData.rearviewMirror,
			sideview_mirror: formData.sideviewMirror,
			vehicle_id: formData.vehicle.id,
			front_camera: formData.frontCamera,
			topics: formData.topics.join(","),
			id: reportId,
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
							"/vehicles/report/inspection/info/" +
							reportId,
					},
				),
			);
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
						onClick: () => {
							submit(
								{},
								{
									action:
										"/vehicles/report/inspection/info/" +
										reportId,
								},
							);
						},
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
