import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ReportGeneralPageLoaderData } from "./loader";
import { postPickupRouteReportGeneral } from "$backend/database/post";

export const ReportGeneralPage: FC = () => {
	const {
		topicOptions,
		initFormData,
		driverOptions,
		routeId,
	} =
		useLoaderData() as ReportGeneralPageLoaderData;

	const submit = useSubmit();

	const handleSubmit = async (
		formData: PickupRouteReportFormData,
	) => {
		postPickupRouteReportGeneral(formData).then(
			(reportId) => {
				toast.success("บันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/pickup-route/report/general/info" +
							reportId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
				submit(
					{},
					{
						action:
							"/pickup-route/info" + routeId,
					},
				);
			},
		);
	};

	const handleCancel = () =>
		submit({}, { action: "/" });

	const heading = `ลงบันทึกเรื่องร้องเรียนสายรถ`;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<PickupRouteReportForm
				routeOptions={driverOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
