import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";
import { postPickupRouteReportGeneral } from "$backend/database/post";

export const NewPage: FC = () => {
	const {
		routeOptions,
		topicOptions,
		initFormData,
	} = useLoaderData() as NewPageLoaderData;

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
							"/pickup-routes/report/info/" +
							reportId,
					},
				);
			},
			() => {
				toast.error("บันทึกล้มเหลว");
				submit(
					{},
					{
						action: "/pickup-routes/report",
					},
				);
			},
		);
	};

	const handleCancel = () =>
		submit({}, { action: "/" });

	const heading = "ลงบันทึกเรื่องร้องเรียนสายรถ";

	console.log("NewPage", initFormData.route);

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<PickupRouteReportForm
				routeOptions={routeOptions}
				initFormData={initFormData}
				topicOptions={topicOptions}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
