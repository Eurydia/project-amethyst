import { postDriverReport } from "$backend/database/put";
import { DriverReportForm } from "$components/DriverReportForm";
import {
	Alert,
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
import { DriverReportMedicalNewPageLoaderData } from "./loader";
import { DriverReportFormData } from "$types/form-data";

export const DriverReportMedicalNewPage: FC =
	() => {
		const {
			driverOptions,
			topicOptions,
			initFormData,
		} =
			useLoaderData() as DriverReportMedicalNewPageLoaderData;

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
			<Container maxWidth="md">
				<Stack spacing={2}>
					<Typography variant="h1">
						บันทึกผลการตรวจสารเสพติด
					</Typography>
					<Alert
						severity="info"
						icon={false}
					>
						<Typography>TBA</Typography>
					</Alert>
					<DriverReportForm
						driverOptions={driverOptions}
						initFormData={initFormData}
						topicOptions={topicOptions}
						onSubmit={handleSubmit}
						onCancel={handleCancel}
					/>
				</Stack>
			</Container>
		);
	};
