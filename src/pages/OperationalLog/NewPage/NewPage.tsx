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
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const {
		initFormData,
		driverOptions,
		routeOptions,
		vehicleOptions,
	} = useLoaderData() as NewPageLoaderData;
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

		postOperationalLog({
			driver_id: formData.driver.id,
			vehicle_id: formData.vehicle.id,
			route_id: formData.route.id,
			end_date: formData.endDate,
			start_date: formData.endDate,
		})
			.then(
				() => toast.success("ลงบันทึกสำเร็จ"),
				() => toast.error("ลงบันทึกล้มเหลว"),
			)
			.finally(() =>
				submit(
					{},
					{ action: "/operational-logs" },
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
						{ action: "/operational-logs" },
					)
				}
				driverOptions={driverOptions}
				routeOptions={routeOptions}
				vehicleOptions={vehicleOptions}
			/>
		</Stack>
	);
};
