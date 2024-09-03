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
import { putPickupRouteReportGeneral } from "$backend/database/put";
import { toast } from "react-toastify";

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
	) => {
		if (formData.route === null) {
			return;
		}
		putPickupRouteReportGeneral({
			content: formData.content,
			id: reportId,
			datetime: formData.datetime,
			route_id: formData.route.id,
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
							"/pickup-route/report/general/info/" +
							reportId,
					},
				),
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
				onSubmit={handleSubmit}
				onCancel={() => {
					submit(
						{},
						{
							action:
								"/pickup-route/report/general/info/" +
								reportId,
						},
					);
				}}
			/>
		</Stack>
	);
};
