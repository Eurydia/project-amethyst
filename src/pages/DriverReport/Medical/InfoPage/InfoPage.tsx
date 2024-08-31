import { DriverReportDetails } from "$components/DriverReportDetails";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { entry } =
		useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const heading = `ผลการตรวจสารเสพติด เลขที่ ${entry.id}`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<DriverReportDetails
				entry={entry}
				onEdit={() =>
					submit({}, { action: "./edit" })
				}
			/>
		</Stack>
	);
};
