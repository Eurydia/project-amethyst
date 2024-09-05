import { DriverModel } from "$types/models/Driver";
import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { BaseGallery } from "./BaseGallery";
import { BaseInfoGroup } from "./BaseInfoGroup";

type DriverInfoGroupProps = {
	driver: DriverModel;
};
export const DriverInfoGroup: FC<
	DriverInfoGroupProps
> = (props) => {
	const { driver } = props;
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
	].map((item) => ({
		label: item.label,
		value: <Typography>{item.value}</Typography>,
	}));

	infoItems.push({
		label: "รูปภาพ",
		value: (
			<BaseGallery
				dirPath={[
					"drivers",
					driver.id.toString(),
					"images",
				]}
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
