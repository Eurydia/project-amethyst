import { DriverTable } from "$components/DriverTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const {
		driverEntries,
		driverMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				รายชื่อคนขับรถ
			</Typography>
			<DriverTable
				entries={driverEntries}
				slotProps={{
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
