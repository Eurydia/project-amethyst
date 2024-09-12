import { DriverTable } from "$components/DriverTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	Link,
	useLoaderData,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { driverEntries } =
		useLoaderData() as IndexPageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography
				component={Link}
				to="/"
			>
				<KeyboardArrowLeftRounded />
				หน้าแรก
			</Typography>
			<Typography variant="h1">
				รายชื่อคนขับรถ
			</Typography>
			<DriverTable entries={driverEntries} />
		</Stack>
	);
};
