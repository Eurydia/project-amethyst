import { postPickupRoute } from "$backend/database/post";
import { PickupRouteForm } from "$components/PickupRouteForm";
import { PickupRouteFormData } from "$types/models/PickupRoute";
import { AddRounded } from "@mui/icons-material";
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
	const handleCancel = () => {
		submit(
			{},
			{
				replace: true,
				action: "/pickup-routes",
			},
		);
	};
	const handleSubmit = (
		formData: PickupRouteFormData,
	) => {
		postPickupRoute(formData)
			.then((routeId) => {
				toast.success("ลงทะเบียนสำเร็จ");
				submit(
					{},
					{
						replace: true,
						action:
							"/pickup-routes/info/" + routeId,
					},
				);
			})
			.catch(() => {
				toast.error("ลงทะเบียนล้มเหลว");
				handleCancel();
			});
	};

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ลงทะเบียนสายรถ
			</Typography>
			<PickupRouteForm
				initFormData={initFormData}
				slotProps={{
					submitButton: {
						onClick: handleSubmit,
						label: "ลงทะเบียนสายรถ",
						startIcon: <AddRounded />,
					},
					cancelButton: {
						onClick: handleCancel,
					},
				}}
			/>
		</Stack>
	);
};
