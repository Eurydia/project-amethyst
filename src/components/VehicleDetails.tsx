import { VehicleModel } from "$types/models/Vehicle";
import { Typography } from "@mui/material";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseGallery } from "./BaseGallery";
import { BaseInfoGroup } from "./BaseInfoGroup";

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
			label: "เลขที่รถรับส่ง",
			value: vehicle.id,
		},
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
			<BaseGallery
				images={images}
				onOpenRoot={() => {}}
			/>
		),
	});

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					onClick: () =>
						submit({}, { action: "./edit" }),
				},
			}}
		>
			{detailItems}
		</BaseInfoGroup>
	);
};
