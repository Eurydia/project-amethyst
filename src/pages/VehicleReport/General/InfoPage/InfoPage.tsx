import { VehicleReportGeneralDetails } from "$components/VehicleReportGeneralDetails";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report } =
		useLoaderData() as InfoPageLoaderData;

	const heading = `เรื่องร้องเรียนทะเบียนรถ (รหัส ${report.id})`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportGeneralDetails
				report={report}
			/>
		</Stack>
	);
};
