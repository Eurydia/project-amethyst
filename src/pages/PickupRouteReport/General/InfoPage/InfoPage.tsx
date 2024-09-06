import { PickupRouteReportInfoGroup } from "$components/PickupRouteReportInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report, route } =
		useLoaderData() as InfoPageLoaderData;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				เรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportInfoGroup
				report={report}
				route={route}
			/>
		</Stack>
	);
};
