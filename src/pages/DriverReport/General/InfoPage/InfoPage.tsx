import { DriverReportInfoGroup } from "$components/DriverReportInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report, driver } =
		useLoaderData() as InfoPageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				เรื่องร้องเรียนคนขับรถ
			</Typography>
			<DriverReportInfoGroup
				report={report}
				driver={driver}
			/>
		</Stack>
	);
};
