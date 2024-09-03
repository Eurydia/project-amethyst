import { BaseInfoGroup } from "$components/BaseDetails";
import { Gallery } from "$components/Gallery";
import { TRANSLATION } from "$locale/th";
import { DriverModel } from "$types/models/Driver";
import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";

type DriverDetailsProps = {
	images: {
		src: string;
		fileName: string;
	}[];
	driver: DriverModel;
};
export const DriverDetails: FC<
	DriverDetailsProps
> = (props) => {
	const { images, driver } = props;
	const submit = useSubmit();
	const infoItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: TRANSLATION.driverNameAndSurname,
			value: (
				<Typography>
					{driver.name} {driver.surname}
				</Typography>
			),
		},
		{
			label: TRANSLATION.driverContact,
			value: (
				<Typography>{driver.contact}</Typography>
			),
		},
		{
			label: TRANSLATION.driverLicenseType,
			value: (
				<Typography>
					{driver.license_type}
				</Typography>
			),
		},
		{
			label: TRANSLATION.gallery,
			value: (
				<Gallery
					images={images}
					onOpenRoot={() => {}}
				/>
			),
		},
	];
	return (
		<BaseInfoGroup
			slotProps={{
				editButton: {
					onClick: () =>
						submit(
							{},
							{
								action: "./edit",
							},
						),
				},
			}}
		>
			{infoItems}
		</BaseInfoGroup>
	);
};
