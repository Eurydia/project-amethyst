import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import {
	useLoaderData,
	useSubmit,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";
import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";

export const IndexPage: FC = () => {
	const { entries } =
		useLoaderData() as IndexPageLoaderData;
	const submit = useSubmit();
	const heading = `สมุดบันทึกเรื่องร้องเรียนทะเบียนรถ`;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportGeneralTable
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
