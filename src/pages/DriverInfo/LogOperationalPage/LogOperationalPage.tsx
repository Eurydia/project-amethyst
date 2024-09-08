import { postOperationalLog } from "$backend/database/post";
import { OperationalLogForm } from "$components/OperationalLogForm";
import { OperationalLogFormData } from "$types/models/OperatonalLog";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { LogOperationalPageLoaderData } from "./loader";

export const LogOperationalPage: FC = () => {
	const {
		driver,
		initFormData,
		routeSelectOptions,
		vehicleSelectOptions,
	} =
		useLoaderData() as LogOperationalPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: OperationalLogFormData,
	) => {
		postOperationalLog(formData)
			.then(
				() => toast.success("ลงบันทึกสำเร็จ"),
				() => toast.error("ลงบันทึกล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{
						replace: true,
						action: "/drivers/info/" + driver.id,
					},
				),
			);
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงบันทึกประวัติการเดินรถ
			</Typography>
			<OperationalLogForm
				initFormData={initFormData}
				slotProps={{
					cancelButton: {
						onClick: () => {
							submit(
								{},
								{
									replace: true,
									action:
										"/vehicles/info/" + driver.id,
								},
							);
						},
					},
					driverSelect: {
						disabled: true,
						options: [driver],
					},
					routeSelect: {
						options: routeSelectOptions,
					},
					vehicleSelect: {
						options: vehicleSelectOptions,
					},
					submitButton: {
						onClick: handleSubmit,
					},
				}}
			/>
		</Stack>
	);
};
