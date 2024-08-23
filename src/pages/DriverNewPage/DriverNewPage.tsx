import { postDriver } from "$backend/database/put";
import { DriverLicenseSelect } from "$components/DriverLicenseSelect";
import { DriverRegisterForm } from "$components/DriverRegisterForm";
import { DriverFormData } from "$types/models";
import { AddRounded } from "@mui/icons-material";
import {
	Stack,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { useSubmit } from "react-router-dom";
import { toast } from "react-toastify";

export const DriverNewPage: FC = () => {
	const submit = useSubmit();
	const [fieldName, setFieldName] = useState("");

	const handleSubmit = async (
		formData: DriverFormData,
	) => {
		postDriver(formData)
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
			<Stack spacing={1}>
				<Typography variant="h1">
					ลงทะเบียนคนขับรถ
				</Typography>
			</Stack>
			<DriverRegisterForm
				initFormData={{
					name: "",
					surname: "",
					contact: "",
					license_type: "",
				}}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</Stack>
	);
};
