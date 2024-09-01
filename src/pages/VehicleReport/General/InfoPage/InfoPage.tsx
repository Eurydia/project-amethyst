import { BaseDetails } from "$components/BaseReportDetails";
import { renderReportToInfoItems } from "$core/renderReports";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { entry } =
		useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const heading = `บันทึกเรื่องร้องเรียนทะเบียนรถ เลขที่ ${entry.id}`;

	const infoItems = [
		{
			label: "เลขทะเบียนรถ",
			value: (
				<Typography
					component={Link}
					to={"/vehicles/info/" + entry.vehicleId}
				>
					{entry.vehicleLicensePlate}
				</Typography>
			),
		},
		...renderReportToInfoItems(entry),
	];

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<BaseDetails
				onEdit={() =>
					submit({}, { action: "./edit" })
				}
			>
				{infoItems}
			</BaseDetails>
		</Stack>
	);
};
