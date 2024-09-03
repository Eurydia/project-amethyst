import { DriverModel } from "$types/models/Driver";
import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { BaseGallery } from "./BaseGallery";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverInfoGroupProps = {
	driver: DriverModel;
	images: {
		src: string;
		fileName: string;
	}[];
};
export const DriverInfoGroup: FC<
	DriverInfoGroupProps
> = (props) => {
	const { images, driver } = props;
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
			label: "ชื่อและนามสกุล",
			value: `${driver.name} ${driver.surname}`,
		},
		{
			label: "เบอร์ติดต่อ",
			value: driver.contact,
		},
		{
			label: "ประเภทใบขับขี่",
			value: driver.license_type,
		},
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));

	infoItems.push({
		label: "รูปภาพ",
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
						submit(
							{},
							{
								action: `/drivers/info/${driver.id}/edit`,
							},
						),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
