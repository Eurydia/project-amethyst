import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoEditPageLoaderData } from "./loader";

export const InfoEditPage: FC = () => {
	const {
		reportId,
		initFormData,
		routeOptions,
		topicOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: PickupRouteReportFormData,
	) => {};

	const handleCancel = () => {
		submit(
			{},
			{
				action:
					"/pickup-route/report/general/info/" +
					reportId,
			},
		);
	};

	const heading = `บันทึกเรื่องร้องเรียนสายรถ เลขที่ ${reportId} (แก้ไข)`;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<PickupRouteReportForm
				routeOptions={routeOptions}
				topicOptions={topicOptions}
				initFormData={initFormData}
				onCancel={handleCancel}
				onSubmit={handleSubmit}
			/>
		</Stack>
	);
};
