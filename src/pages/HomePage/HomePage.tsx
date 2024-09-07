import { AttendanceLogTable } from "$components/AttendanceLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { HomePageLoaderData } from "./loader";

export const HomePage: FC = () => {
	const {
		entries,
		driverMultiSelectOptions,
		vehicleMultiSelectOptions,
		routeMultiSelectOptions,
	} = useLoaderData() as HomePageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				หน้าแรก
			</Typography>
			<AttendanceLogTable
				entries={entries}
				slotProps={{
					driverMultiSelect: {
						options: driverMultiSelectOptions,
					},
					vehicleMultiSelect: {
						options: vehicleMultiSelectOptions,
					},
					routeMultiSelect: {
						options: routeMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
