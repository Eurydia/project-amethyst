import { PickupRouteModel } from "$types/models/PickupRoute";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseInfoGroup } from "./BaseInfoGroup";

type PickupRouteInfoGroupProps = {
	route: PickupRouteModel;
};
export const PickupRouteInfoGroup: FC<
	PickupRouteInfoGroupProps
> = (props) => {
	const { route } = props;
	const submit = useSubmit();

	const infoItems = [
		{
			label: "รหัสเลขที่สายรถ",
			value: route.id,
		},
		{
			label: "ชื่อสาย",
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
	].map(({ label, value }) => ({
		label,
		value: <Typography>{value}</Typography>,
	}));

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					label: "edit",
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
