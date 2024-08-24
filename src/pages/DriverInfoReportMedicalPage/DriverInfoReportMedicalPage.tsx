import { postDriverReport } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import { DriverReportFormData } from "$types/models";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverInfoReportMedicalPageLoaderData } from "./loader";

export const DriverInfoReportMedicalPage: FC =
	() => {
		const {
			driver,
			topics,
			initFormData,
			drivers,
		} =
			useLoaderData() as DriverInfoReportMedicalPageLoaderData;

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
					บันทึกผลการตรวจสารเสพติด
				</Typography>
				<DriverReportForm
					drivers={drivers}
					topics={topics}
					initFormData={initFormData}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					selectedDriver={driver}
				/>
			</Stack>
		);
	};
