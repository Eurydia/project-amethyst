import { InfoGroupItemDefinition } from "$types/generics";
import { DriverModel } from "$types/models/Driver";
import { Typography } from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { FC } from "react";
import { BaseGallery } from "./BaseGallery";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverInfoGroupProps = {
	driver: DriverModel;
	slotProps: {
		editButton: {
			label: string;
			onClick: () => void;
		};
		gallery: {
			dirPath: string;
			fileEntries: FileEntry[];
		};
	};
};
export const DriverInfoGroup: FC<
	DriverInfoGroupProps
> = (props) => {
	const { driver, slotProps } = props;

	const infoItems: InfoGroupItemDefinition[] = [
		{
			label: "ชื่อสกุล",
			value: (
				<Typography>{`${driver.name} ${driver.surname}`}</Typography>
			),
		},
		{
			label: "เบอร์ติดต่อ",
			value:
				driver.contact.trim().length > 0 ? (
					<Typography>
						{driver.contact}
					</Typography>
				) : (
					<Typography fontStyle="italic">
						ไม่มี
					</Typography>
				),
		},
		{
			label: "ประเภทใบขับขี่",
			value: driver.license_type,
		},
		{
			label: "รูปภาพ",
			value: (
				<BaseGallery
					dirPath={slotProps.gallery.dirPath}
					fileEntries={
						slotProps.gallery.fileEntries
					}
				/>
			),
		},
	];

	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					label: slotProps.editButton.label,
					onClick: slotProps.editButton.onClick,
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
