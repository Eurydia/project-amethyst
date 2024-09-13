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
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		routeSelectOptions,
		initFormData,
		topicComboBoxOptions,
	} = useLoaderData() as NewPageLoaderData;

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
						replace: true,
						action:
							"/pickup-routes/report/general/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error("ลงบันทึกล้มเหลว");
				submit(
					{},
					{
						replace: true,
						action: "/pickup-routes/report",
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
					topicComboBox: {
						options: topicComboBoxOptions,
					},
					routeSelect: {
						options: routeSelectOptions,
					},
					submitButton: {
						onClick: handleSubmit,
						startIcon: <AddRounded />,
						label: "ลงบันทึก",
					},
					cancelButton: {
						onClick: () =>
							submit(
								{},
								{
									replace: true,
									action: "/pickup-routes/report",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
