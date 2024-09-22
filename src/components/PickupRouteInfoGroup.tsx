/** @format */

import { FormalLayout } from "$layouts/FormalLayout";
import { PickupRouteModel } from "$types/models/pickup-route";
import { EditRounded } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, Fragment, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { PickupRouteForm } from "./PickupRouteForm";

type PickupRouteInfoGroupProps = {
	route: PickupRouteModel;
};
export const PickupRouteInfoGroup: FC<PickupRouteInfoGroupProps> = (props) => {
	const { route } = props;

	const [dialogOpen, setDialogOpen] = useState(false);
	const { revalidate } = useRevalidator();

	const infoItems = [
		{
			label: "ชื่อสาย",
			value: route.name,
		},
		{
			label: "เวลานำเข้า",
			value: dayjs(route.arrival_time, "HH:mm").format("HH:mm น."),
		},
		{
			label: "เวลานำออก",
			value: dayjs(route.departure_time, "HH:mm").format("HH:mm น."),
		},
	].map(({ label, value }) => ({
		label,
		value: <Typography>{value}</Typography>,
	}));

	return (
		<Fragment>
			<Button
				variant="contained"
				onClick={() => setDialogOpen(true)}
				startIcon={<EditRounded />}
			>
				แก้ไขข้อมูล
			</Button>
			<FormalLayout>{infoItems}</FormalLayout>
			<PickupRouteForm
				editing
				routeId={route.id}
				initFormData={{
					name: route.name,
					arrivalTime: route.arrival_time,
					departureTime: route.departure_time,
				}}
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			/>
		</Fragment>
	);
};
