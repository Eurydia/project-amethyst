import { VehicleModel } from "$types/models/vehicle";
import { Typography } from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { FC } from "react";
import { useSubmit } from "react-router-dom";
import { BaseGallery } from "./BaseGallery";
import { BaseInfoGroup } from "./BaseInfoGroup";

type VehicleInfoGroupProps = {
	vehicle: VehicleModel;
	slotProps: {
		gallery: {
			fileEntries: FileEntry[];
			dirPath: string;
		};
	};
};
export const VehicleInfoGroup: FC<
	VehicleInfoGroupProps
> = (props) => {
	const { vehicle, slotProps } = props;
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
				dirPath={slotProps.gallery.dirPath}
				fileEntries={
					slotProps.gallery.fileEntries
				}
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
