import { VehicleReportInspectionTable } from "$components/VehicleReportInspectionTable";
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

	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				สมุดบันทึกผลการตรวจสารเสพติด
			</Typography>
			<VehicleReportInspectionTable
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
