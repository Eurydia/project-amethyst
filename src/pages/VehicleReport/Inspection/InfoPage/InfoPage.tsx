import { VehicleReportInspectionInfoGroup } from "$components/VehicleReportInspectionInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const {
		report,
		inspectionRoundNumber,
		vehicle,
	} = useLoaderData() as InfoPageLoaderData;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				ผลการตรวจสภาพรถ
			</Typography>
			<VehicleReportInspectionInfoGroup
				report={report}
				vehicle={vehicle}
				inspectionRoundNumber={
					inspectionRoundNumber
				}
			/>
		</Stack>
	);
};
