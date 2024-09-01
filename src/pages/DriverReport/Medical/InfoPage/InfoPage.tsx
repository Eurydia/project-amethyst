import { renderReportToInfoItems } from "$core/renderReports";
import { DriverReport } from "$types/models/Driver";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	Link,
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";
import { BaseDetails } from "$components/BaseDetails";

type CustomDetailsProps = {
	report: DriverReport;
};
const CustomDetails: FC<CustomDetailsProps> = (
	props,
) => {
	const { report } = props;
	const submit = useSubmit();

	const infoItems = [
		{
			label: "คนขับ",
			value: (
				<Typography
					component={Link}
					to={"/drivers/info/" + report.driverId}
				>
					{report.driverName}{" "}
					{report.driverSurname}
				</Typography>
			),
		},
		...renderReportToInfoItems(report),
	];

	return (
		<BaseDetails
			onEdit={() =>
				submit({}, { action: "./edit" })
			}
		>
			{infoItems}
		</BaseDetails>
	);
};

export const InfoPage: FC = () => {
	const { report } =
		useLoaderData() as InfoPageLoaderData;

	const heading = `ผลการตรวจสารเสพติด`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<CustomDetails report={report} />
		</Stack>
	);
};
