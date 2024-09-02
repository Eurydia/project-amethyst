import { VehicleModel } from "$types/models/Vehicle";
import { BaseDetails } from "./BaseDetails";
import { useSubmit } from "react-router-dom";
import { FC } from "react";
import { Typography } from "@mui/material";
import { Gallery } from "./Gallery";

type VehicleDetailsProps = {
	vehicle: VehicleModel;
	images: { fileName: string; src: string }[];
};
export const VehicleDetails: FC<
	VehicleDetailsProps
> = (props) => {
	const { vehicle, images } = props;
	const submit = useSubmit();

	const detailItems = [
		{
			label: "เลขทะเบียน",
			value: vehicle.license_plate,
		},
		{
			label: "จังหวัดที่จดทะเบียน",
			value: vehicle.registered_city,
		},
		{
			label: "ประเภทรถ",
			value: vehicle.vehicle_class,
		},
		{
			label: "หจก.",
			value: vehicle.vendor,
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));

	detailItems.push({
		label: "คลังภาพ",
		value: (
			<Gallery
				images={images}
				onOpenRoot={() => {}}
			/>
		),
	});

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
