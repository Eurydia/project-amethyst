import { VehicleReportInspectionDetails } from "$components/VehicleReportInspectionDetails";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report } =
		useLoaderData() as InfoPageLoaderData;

	const heading = `ผลการตรวจสภาพรถ ${report.vehicleLicensePlate}`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportInspectionDetails
				report={report}
			/>
		</Stack>
	);
};
