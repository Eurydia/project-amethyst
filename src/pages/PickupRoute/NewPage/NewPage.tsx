import { postPickupRoute } from "$backend/database/post";
import { PickupRouteForm } from "$components/PickupRouteForm";
import { TRANSLATION } from "$locale/th";
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
		postPickupRoute(formData)
			.then((routeId) => {
				toast.success(TRANSLATION.postSuccess);
				submit(
					{},
					{
						action:
							"/pickup-routes/info/" + routeId,
					},
				);
			})
			.catch(() => {
				toast.error(TRANSLATION.postFail);
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
				{TRANSLATION.pickupRoutePostFormTitle}
			</Typography>
			<PickupRouteForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() => {
					submit(
						{},
						{
							action: "/pickup-routes",
						},
					);
				}}
			/>
		</Stack>
	);
};
