import { postDriverReport } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import {
	Container,
	Stack,
	Typography,
} from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DriverInfoReportGeneralPageLoaderData } from "./loader";
import { DriverReportFormData } from "$types/form-data";

export const DriverInfoReportGeneralPage: FC =
	() => {
		const {
			topicOptions,
			initFormData,
			driverOptions,
		} =
			useLoaderData() as DriverInfoReportGeneralPageLoaderData;

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
					driverOptions={driverOptions}
					topicOptions={topicOptions}
					initFormData={initFormData}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
				/>
			</Stack>
		);
	};
