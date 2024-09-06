import { PickupRouteTable } from "$components/PickupRouteTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const {
		routeEntries,
		routeMultiSelectOptions,
	} = useLoaderData() as IndexPageLoaderData;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางสายรถ
			</Typography>
			<PickupRouteTable
				entries={routeEntries}
				slotProps={{
					routeMultiSelect: {
						options: routeMultiSelectOptions,
					},
				}}
			/>
		</Stack>
	);
};
