import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();
	const heading = `สมุดบันทึกเรื่องร้องเรียนสายรถ`;

	return (
		<Stack sx={{ gap: 1 }}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<PickupRouteReportGeneralTable
				entries={entries}
				onAdd={() =>
					submit(
						{},
						{
							action: "./new",
						},
					)
				}
			/>
		</Stack>
	);
};
