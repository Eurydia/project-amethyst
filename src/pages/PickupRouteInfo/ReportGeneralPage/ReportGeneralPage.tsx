import { postPickupRouteReportGeneral } from "$backend/database/post";
import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";
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

	const handleSubmit = async (
		formData: PickupRouteReportFormData,
	) => {
		postPickupRouteReportGeneral(formData).then(
			(reportId) => {
				toast.success("ลงบันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/pickup-routes/report/general/info/" +
							reportId,
					},
				);
			},
			() => {
				submit(
					{},
					{
						action:
							"/pickup-routes/info/" + route.id,
					},
				);
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
						onClick: () =>
							submit(
								{},
								{
									action:
										"/pickup-routes/info/" +
										initFormData.route.id,
								},
							),
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
