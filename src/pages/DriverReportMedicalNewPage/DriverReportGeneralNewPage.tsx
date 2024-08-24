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
import { DriverReportGeneralNewPageLoaderData } from "./loader";

export const DriverReportGeneralNewPage: FC =
	() => {
		const { drivers, topics, initFormData } =
			useLoaderData() as DriverReportGeneralNewPageLoaderData;

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
					initFormData={initFormData}
					selectedDriver={null}
					topics={topics}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			</Stack>
		);
	};
