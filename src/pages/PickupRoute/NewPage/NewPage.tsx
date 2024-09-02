import { putPickupRoute } from "$backend/database/put";
import { PickupRouteForm } from "$components/PickupRouteForm";
import { PickupRouteFormData } from "$types/models/PickupRoute";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import { NewPageLoaderData } from "./loader";

export const NewPage: FC = () => {
	const { initFormData } =
		useLoaderData() as NewPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = (
		formData: PickupRouteFormData,
	) => {
		putPickupRoute(formData)
			.then((routeId) => {
				toast.success("บันทึกสำเร็จ");
				submit(
					{},
					{
						action:
							"/pickup-routes/info/" + routeId,
					},
				);
			})
			.catch(() => {
				toast.error("บันทึกล้มเหลว");
			});
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงทะเบียนสายรถ
			</Typography>
			<PickupRouteForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() => {
					submit({}, { action: "/" });
				}}
			/>
		</Stack>
	);
};
