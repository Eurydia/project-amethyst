import { PickupRouteReportDetails } from "$components/PickupRouteReportDetails";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { InfoPageLoaderData } from "./loader";

export const InfoPage: FC = () => {
	const { report } =
		useLoaderData() as InfoPageLoaderData;
	const submit = useSubmit();

	const heading = `บันทึกเรื่องร้องเรียนสายรถ เลขที่ ${report.id}`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<PickupRouteReportDetails
				report={report}
				onEdit={() =>
					submit({}, { action: "./edit" })
				}
			/>
		</Stack>
	);
};
