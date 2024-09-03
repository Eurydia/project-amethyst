import { putPickupRoute } from "$backend/database/put";
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
import { EditPageLoaderData } from "./loader";

export const EditPage: FC = () => {
	const { initFormData, routeId } =
		useLoaderData() as EditPageLoaderData;
	const submit = useSubmit();

	const handleSubmit = async (
		formData: PickupRouteFormData,
	) => {
		putPickupRoute({
			arrival_time: formData.arrivalTime,
			departure_time: formData.departureTime,
			name: formData.name,
			id: routeId,
		})
			.then(
				() =>
					toast.success(TRANSLATION.putSuccess),
				() => toast.error(TRANSLATION.putFail),
			)
			.finally(() =>
				submit(
					{},
					{
						action:
							"/pickup-routes/info/" + routeId,
					},
				),
			);
	};

	const heading =
		TRANSLATION.pickupRouteEditDetailsWithLabel(
			initFormData.name,
		);

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<PickupRouteForm
				initFormData={initFormData}
				onSubmit={handleSubmit}
				onCancel={() =>
					submit(
						{},
						{
							action:
								"/pickup-routes/info/" + routeId,
						},
					)
				}
			/>
		</Stack>
	);
};
