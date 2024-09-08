import { putPickupRouteReportGeneral } from "$backend/database/put";
import { PickupRouteReportForm } from "$components/PickupRouteReportForm";
import { PickupRouteReportFormData } from "$types/models/PickupRoute";
import { SaveRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { InfoEditPageLoaderData } from "./loader";

export const InfoEditPage: FC = () => {
	const {
		initFormData,
		reportId,
		routeSelectOptions,
		topicComboBoxOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: PickupRouteReportFormData,
	) => {
		putPickupRouteReportGeneral({
			id: reportId,
			content: formData.content,
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
						replace: true,
						action:
							"/pickup-routes/report/general/info/" +
							reportId,
					},
				),
			);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				แก้ไขเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportForm
				initFormData={initFormData}
				slotProps={{
					topicComboBox: {
						options: topicComboBoxOptions,
					},
					routeSelect: {
						disabled: true,
						options: routeSelectOptions,
					},
					submitButton: {
						onClick: handleSubmit,
						startIcon: <SaveRounded />,
						label: "บันทึก",
					},
					cancelButton: {
						onClick: () => {
							submit(
								{},
								{
									replace: true,
									action:
										"/pickup-route/report/general/info/" +
										reportId,
								},
							);
						},
					},
				}}
			/>
		</Stack>
	);
};
