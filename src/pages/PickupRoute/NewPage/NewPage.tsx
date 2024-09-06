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

	const handleSubmit = (
		formData: PickupRouteFormData,
	) => {
		postPickupRoute(formData)
			.then((routeId) => {
				toast.success("ลงทะเบียนสำเร็จ");
				submit(
					{},
					{
						action:
							"/pickup-routes/info/" + routeId,
					},
				);
			})
			.catch(() => {
				toast.error("ลงทะเบียนล้มเหลว");
				submit(
					{},
					{
						action: "/pickup-routes",
					},
				);
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
						label: "ลงทะเบียน",
						startIcon: <AddRounded />,
					},
					cancelButton: {
						onClick: () => {
							submit(
								{},
								{
									action: "/pickup-routes",
								},
							);
						},
					},
				}}
			/>
		</Stack>
	);
};
