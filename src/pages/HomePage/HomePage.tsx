import { AttendanceTable } from "$components/AttendanceChecklistWidget";
import { RecordTable } from "$components/DailyRecordTableWidget";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { HomePageLoaderData } from "./loader";

export const HomePage: FC = () => {
	const {} =
		useLoaderData() as HomePageLoaderData;
	return (
		<Stack spacing={4}>
			<Typography variant="h1">
				หน้าแรก
			</Typography>
			{/* <RecordTable rows={[]} /> */}
			{/* <AttendanceTable /> */}
		</Stack>
	);
};
