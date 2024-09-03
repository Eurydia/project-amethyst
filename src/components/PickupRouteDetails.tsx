import { BaseDetails } from "./BaseDetails";
import { useSubmit } from "react-router-dom";
import { FC } from "react";
import { Typography } from "@mui/material";
import { PickupRouteModel } from "$types/models/PickupRoute";
import dayjs from "dayjs";

type PickupRouteDetailsProps = {
	route: PickupRouteModel;
};
export const PickupRouteDetails: FC<
	PickupRouteDetailsProps
> = (props) => {
	const { route } = props;
	const submit = useSubmit();

	const detailItems = [
		{
			label: "ชื่อสายรถ",
			value: route.name,
		},
		{
			label: "เวลานำเข้า",
			value: dayjs(
				route.arrival_time,
				"HH:mm",
			).format("HH:mm น."),
		},
		{
			label: "เวลานำออก",
			value: dayjs(
				route.departure_time,
				"HH:mm",
			).format("HH:mm น."),
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));

	return (
		<BaseDetails
			slotProps={{
				editButton: {
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{detailItems}
		</BaseDetails>
	);
};
