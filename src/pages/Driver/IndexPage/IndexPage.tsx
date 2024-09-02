import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData } from "./loader";
import { TRANSLATION } from "$locale/th";
import { DriverTable } from "$components/DriverTable";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{TRANSLATION.driverTable}
			</Typography>
			<DriverTable entries={entries} />
		</Stack>
	);
};
