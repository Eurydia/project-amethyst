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
		driverId,
		initFormData,
		driverOptions,
		routeOptions,
		vehicleOptions,
	} =
		useLoaderData() as LogOperationalPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: OperationalLogFormData,
	) => {
		if (
			formData.driver === null ||
			formData.vehicle === null ||
			formData.route === null
		) {
			return;
		}

		postOperationalLog(formData)
			.then(
				() => toast.success("ลงบันทึกสำเร็จ"),
				() => toast.error("ลงบันทึกล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{ action: "/drivers/info/" + driverId },
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
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action: "/drivers/info/" + driverId,
						},
					)
				}
				driverOptions={driverOptions}
				routeOptions={routeOptions}
				vehicleOptions={vehicleOptions}
			/>
		</Stack>
	);
};
