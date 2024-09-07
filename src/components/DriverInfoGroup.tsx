import { DriverModel } from "$types/models/Driver";
import { Typography } from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { BaseGallery } from "./BaseGallery";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverInfoGroupProps = {
	driver: DriverModel;
	slotProps: {
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
	const submit = useSubmit();

	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "เลขที่คนขับรถ",
			value: driver.id,
		},
		{
			label: "ชื่อสกุล",
			value: `${driver.name} ${driver.surname}`,
		},
		{
			label: "เบอร์ติดต่อ",
			value: driver.contact || "ไม่มี",
		},
		{
			label: "ประเภทใบขับขี่",
			value: driver.license_type,
		},
	].map(({ label, value }) => ({
		label,
		value: <Typography>{value}</Typography>,
	}));

	infoItems.push({
		label: "รูปภาพ",
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
						submit(
							{},
							{
								action: `./edit`,
							},
						),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
