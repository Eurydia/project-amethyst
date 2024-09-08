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
		route,
		topicComboBoxOptions,
	} = useLoaderData() as InfoEditPageLoaderData;
	const submit = useSubmit();

	const handleReturn = () => {
		submit(
			{},
			{
				replace: true,
				action:
					"/pickup-routes/report/general/info/" +
					reportId,
			},
		);
	};

	const handleSubmit = (
		formData: PickupRouteReportFormData,
	) => {
		putPickupRouteReportGeneral(
			reportId,
			formData,
		)
			.then(
				() => toast.success("แก้ไขสำเร็จ"),
				() => toast.error("แก้ไขล้มเหลว"),
			)
			.finally(handleReturn);
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
						options: [route],
					},
					submitButton: {
						onClick: handleSubmit,
						startIcon: <SaveRounded />,
						label: "บันทึก",
					},
					cancelButton: {
						onClick: handleReturn,
					},
				}}
			/>
		</Stack>
	);
};
