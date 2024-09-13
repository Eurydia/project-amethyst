import { postOperationalLog } from "$backend/database/post";
import { OperationalLogForm } from "$components/OperationalLogForm";
import { OperationalLogFormData } from "$types/models/operational-log";
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
		vehicle,
		initFormData,
		driverSelectOptions,
		routeSelectOptions,
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
						action:
							"/vehicles/info/" + vehicle.id,
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
										"/vehicles/info/" +
										vehicle.id,
								},
							);
						},
					},
					driverSelect: {
						options: driverSelectOptions,
					},
					routeSelect: {
						options: routeSelectOptions,
					},
					vehicleSelect: {
						options: [vehicle],
						disabled: true,
					},
					submitButton: {
						onClick: handleSubmit,
					},
				}}
			/>
		</Stack>
	);
};
