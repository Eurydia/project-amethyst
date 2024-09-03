import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
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
	const heading = `ตารางบันทึกเรื่องร้องเรียนรถรับส่ง`;
	return (
		<Stack spacing={1}>
			<Typography variant="h1">
				{heading}
			</Typography>
			<VehicleReportGeneralTable
				entries={entries}
				slotProps={{
					addButton: {
						onClick: () =>
							submit(
								{},
								{
									action:
										"/vehicles/report/general/new",
								},
							),
					},
				}}
			/>
		</Stack>
	);
};
