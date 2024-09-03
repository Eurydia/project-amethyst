import { VehicleTable } from "$components/VehicleTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางรถรับส่ง
			</Typography>
			<VehicleTable entries={entries} />
		</Stack>
	);
};
