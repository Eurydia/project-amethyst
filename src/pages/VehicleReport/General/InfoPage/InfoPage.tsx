import { VehicleReportGeneralInfoGroup } from "$components/VehicleReportGeneralInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report, vehicle } =
		useLoaderData() as InfoPageLoaderData;

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				เรื่องร้องเรียนรถรับส่ง
			</Typography>
			<VehicleReportGeneralInfoGroup
				report={report}
				vehicle={vehicle}
			/>
		</Stack>
	);
};
