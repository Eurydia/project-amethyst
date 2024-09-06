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
		route,
		initFormData,
		driverSelectOptions,
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
						action:
							"/pickup-routes/info/" + route.id,
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
					submitButton: {
						onClick: handleSubmit,
					},
					cancelButton: {
						onClick: () =>
							submit(
								{},
								{
									action:
										"/pickup-routes/info/" +
										route.id,
								},
							),
					},
					routeSelect: {
						disabled: true,
						options: [route],
					},
					driverSelect: {
						options: driverSelectOptions,
					},
					vehicleSelect: {
						options: vehicleSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
