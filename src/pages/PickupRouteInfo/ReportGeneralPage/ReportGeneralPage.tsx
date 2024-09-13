import { postPickupRouteReportGeneral } from "$backend/database/post";
import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportFormData } from "$types/models/pickup-route";
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
		initFormData,
		route,
		topicComboBoxOptions,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;

	const submit = useSubmit();
	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action: "/pickup-routes/info/" + route.id,
			},
		);
	};
	const handleSubmit = async (
		formData: PickupRouteReportFormData,
	) => {
		postPickupRouteReportGeneral(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/pickup-routes/report/general/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error("ลงบันทึกล้มเหลว");
				handleCancel();
			},
		);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						label: "ลงบันทึก",
						startIcon: <AddRounded />,
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: handleCancel,
					},
					routeSelect: {
						disabled: true,
						options: [route],
					},
					topicComboBox: {
						options: topicComboBoxOptions,
					},
				}}
			/>
		</Stack>
	);
};
