import { postDriverReport } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverDraftPageLoaderData } from "./loader";

export const DriverReportPage: FC = () => {
	const { drivers, topics } =
		useLoaderData() as DriverDraftPageLoaderData;

	const [formData] =
		useState<DriverReportFormData>({
			content: "",
			datetime_iso: dayjs().locale("th").format(),
			driver_id: "",
			driver_name: "",
			driver_surname: "",
			topics: "",
			title: "",
		});

	const submit = useSubmit();

	const handleSubmit = async (
		formData: DriverReportFormData,
	) => {
		postDriverReport(formData)
			.then(() => {
				toast.success("บันทึกสำเร็จ");
				submit({}, { action: "/" });
			})
			.catch((error) => {
				console.error(error);
				toast.error("บันทึกล้มเหลว");
			});
	};

	const handleCancel = () =>
		submit({}, { action: "/" });

	return (
		<Stack spacing={2}>
			<Typography variant="h1">
				รายงานปัญหาคนขับรถ
			</Typography>
			<DriverReportForm
				drivers={drivers}
				initFormData={formData}
				selectedDriver={null}
				topics={topics}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
