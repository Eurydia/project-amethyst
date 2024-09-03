import { VehicleReportInspectionDetails } from "$components/VehicleReportInspectionDetails";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report } =
		useLoaderData() as InfoPageLoaderData;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				ผลการตรวจสภาพรถ
			</Typography>
			<VehicleReportInspectionDetails
				report={report}
			/>
		</Stack>
	);
};
