import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { CustomTable } from "./custom-components/CustomTable";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				รายชื่อสายรถ
			</Typography>
			<CustomTable entries={entries} />
		</Stack>
	);
};
