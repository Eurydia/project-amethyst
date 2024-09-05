import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

export const IndexPage: FC = () => {
	const {} =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				ตารางบันทึกเรื่องร้องเรียนสายรถ
			</Typography>
			<PickupRouteReportGeneralTable
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{
									action: "./new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
